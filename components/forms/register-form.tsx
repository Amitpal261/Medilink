"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const form = new FormData(e.currentTarget);
        console.log('Formdata : ', form.getAll)
        const name = String(form.get("name") ?? "");
        const email = String(form.get("email") ?? "");
        const password = String(form.get("password") ?? "");
        const role = String(form.get("role") ?? "patient");

        startTransition(async () => {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
          });
          const data: unknown = await res.json().catch(() => null);
          const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
          if (!res.ok) {
            setError((typeof obj?.error === "string" ? obj.error : null) ?? "Registration failed");
            return;
          }
          router.refresh();
          router.push("/");
        });
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="name">
          Full name
        </label>
        <Input id="name" name="name" placeholder="Dr. Ayesha Khan" required autoComplete="name" />
      </div>
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
        <Input id="password" name="password" type="password" required autoComplete="new-password" />
        <p className="text-xs text-zinc-500 dark:text-red-400">Use at least 8 characters.</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="role">
          I’m signing up as
        </label>
        <select
          id="role"
          name="role"
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-700 dark:focus:ring-zinc-50/10"
          defaultValue="patient"
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin (demo)</option>
        </select>
      </div>

      {error ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </p>
      ) : null}

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}

