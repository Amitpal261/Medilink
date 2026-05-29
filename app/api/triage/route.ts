import { json } from "@/app/api/_utils";

type TriageResult = {
  urgency: "low" | "medium" | "high";
  specialist: string;
  reasoning: string;
  disclaimer: string;
};

const FALLBACK: TriageResult = {
  urgency: "medium",
  specialist: "General Physician",
  reasoning: "Could not analyse symptoms. Please consult a general physician.",
  disclaimer: "This is not a medical diagnosis.",
};

const SYSTEM_PROMPT =
  "You are a medical triage assistant for MediLink, a healthcare platform in India. Given patient symptoms, return ONLY valid JSON with these fields: urgency ('low', 'medium', or 'high'), specialist (the type of doctor needed, e.g. 'General Physician', 'ENT Specialist', 'Cardiologist'), reasoning (1 sentence explaining why), disclaimer ('This is not a medical diagnosis. Please consult a doctor.'). Never include markdown, never include text outside the JSON object.";

function parseTriageJson(text: string): TriageResult | null {
  const trimmed = text.trim();
  const jsonStr = trimmed.startsWith("```")
    ? trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "")
    : trimmed;

  try {
    const parsed = JSON.parse(jsonStr) as Record<string, unknown>;
    const urgency = parsed.urgency;
    if (urgency !== "low" && urgency !== "medium" && urgency !== "high") return null;
    if (typeof parsed.specialist !== "string" || typeof parsed.reasoning !== "string") return null;
    return {
      urgency,
      specialist: parsed.specialist,
      reasoning: parsed.reasoning,
      disclaimer:
        typeof parsed.disclaimer === "string"
          ? parsed.disclaimer
          : "This is not a medical diagnosis. Please consult a doctor.",
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { symptoms?: string } | null;
    const symptoms = typeof body?.symptoms === "string" ? body.symptoms.trim() : "";

    if (!symptoms) {
      return json({ error: "Symptoms are required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return json(FALLBACK);
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Patient symptoms: ${symptoms}` }],
      }),
    });

    if (!response.ok) {
      return json(FALLBACK);
    }

    const data = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };

    const text = data.content?.find((block) => block.type === "text")?.text;
    if (!text) {
      return json(FALLBACK);
    }

    const result = parseTriageJson(text);
    return json(result ?? FALLBACK);
  } catch {
    return json(FALLBACK);
  }
}
