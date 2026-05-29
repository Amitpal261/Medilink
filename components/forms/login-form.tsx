"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    return next && next.startsWith("/") ? next : null;
  }, [searchParams]);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") ?? "");
        const password = String(form.get("password") ?? "");

        startTransition(async () => {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data: unknown = await res.json().catch(() => null);
          const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
          if (!res.ok) {
            setError((typeof obj?.error === "string" ? obj.error : null) ?? "Login failed");
            return;
          }

          router.refresh();
          router.push(nextPath ?? "/");
        });
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="email">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="you@clinic.com" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="password">
          Password
        </label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>

      {error ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </p>
      ) : null}

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

