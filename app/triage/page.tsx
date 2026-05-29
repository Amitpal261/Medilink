"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Container } from "@/components/ui/container";

type TriageResult = {
  urgency: "low" | "medium" | "high";
  specialist: string;
  reasoning: string;
  disclaimer: string;
};

const SYMPTOM_CHIPS = [
  "Fever",
  "Headache",
  "Chest pain",
  "Stomach ache",
  "Ear pain",
  "Back pain",
  "Skin rash",
  "Fatigue",
] as const;

const URGENCY_LABELS: Record<
  TriageResult["urgency"],
  { label: string; className: string }
> = {
  low: {
    label: "🟢 Self-care",
    className: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  },
  medium: {
    label: "🟡 Book within 48h",
    className: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  },
  high: {
    label: "🔴 Seek care today",
    className: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
  },
};

export default function TriagePage() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function appendChip(chip: string) {
    setSymptoms((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return chip;
      if (trimmed.toLowerCase().includes(chip.toLowerCase())) return prev;
      return `${trimmed}, ${chip.toLowerCase()}`;
    });
  }

  async function handleAnalyse() {
    const trimmed = symptoms.trim();
    if (!trimmed) {
      setError("Please describe your symptoms first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: trimmed }),
      });
      const data = (await response.json()) as TriageResult & { error?: string };
      if (!response.ok && data.error) {
        setError(data.error);
        return;
      }
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const urgency = result ? URGENCY_LABELS[result.urgency] : null;

  return (
    <div className="min-h-screen bg-black py-12 dark:bg-[--background] sm:py-16">
      <Container className="max-w-2xl">
        <header className="mb-8 space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            What&apos;s bothering you?
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Describe your symptoms and our AI will route you to the right doctor.
          </p>
        </header>

        <div className="space-y-4">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. I have a fever of 38.5°C for 3 days, my right ear hurts, and I feel dizzy..."
            rows={5}
            className="min-h-32 w-full resize-none rounded-2xl border-2 border-zinc-200 bg-white p-4 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-teal-500"
          />

          <div className="flex flex-wrap gap-2">
            {SYMPTOM_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => appendChip(chip)}
                className="cursor-pointer rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 transition-colors hover:border-teal-400 hover:text-teal-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-teal-500 dark:hover:text-teal-400"
              >
                {chip}
              </button>
            ))}
          </div>

          {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

          <button
            type="button"
            onClick={handleAnalyse}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 text-base font-medium text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Analysing…
              </>
            ) : (
              "Analyse symptoms →"
            )}
          </button>
        </div>

        {result && urgency ? (
          <article className="mt-8 space-y-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${urgency.className}`}
            >
              {urgency.label}
            </span>

            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">You likely need:</p>
              <p className="mt-1 text-2xl font-bold text-teal-600 dark:text-teal-400">{result.specialist}</p>
            </div>

            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{result.reasoning}</p>

            <p className="text-xs text-zinc-500 dark:text-zinc-500">{result.disclaimer}</p>

            <Link
              href={`/doctors?specialty=${encodeURIComponent(result.specialist)}`}
              className="inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700 sm:w-auto"
            >
              Find available {result.specialist} →
            </Link>
          </article>
        ) : null}
      </Container>
    </div>
  );
}
