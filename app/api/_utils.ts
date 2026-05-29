import type { ZodSchema } from "zod";

export async function readJson<T>(req: Request) {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

export async function readValidatedJson<T>(req: Request, schema: ZodSchema<T>) {
  const json = await readJson<unknown>(req);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }
  return { ok: true as const, data: parsed.data };
}

export function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, init);
}

