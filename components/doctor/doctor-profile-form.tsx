"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type DoctorProfile = {
  specialty?: string;
  bio?: string;
  fee?: number;
  city?: string;
  languages?: string[];
};

export function DoctorProfileForm() {
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<DoctorProfile>({});

  const languageText = useMemo(() => (profile.languages ?? []).join(", "), [profile.languages]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch("/api/doctors/me");
      const data: unknown = await res.json().catch(() => null);
      const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
      if (!alive) return;
      setProfile((obj?.profile && typeof obj.profile === "object" ? (obj.profile as DoctorProfile) : {}) ?? {});
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor profile</CardTitle>
        <CardDescription>This information shows up when patients browse doctors.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading…</p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              startTransition(async () => {
                const res = await fetch("/api/doctors/me", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(profile),
                });
                const data: unknown = await res.json().catch(() => null);
                const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
                if (!res.ok) {
                  setError((typeof obj?.error === "string" ? obj.error : null) ?? "Failed to save");
                  return;
                }
                setProfile((obj?.profile && typeof obj.profile === "object" ? (obj.profile as DoctorProfile) : profile) ?? profile);
              });
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="specialty">
                  Specialty
                </label>
                <Input
                  id="specialty"
                  value={profile.specialty ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, specialty: e.target.value }))}
                  placeholder="Cardiology"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="fee">
                  Consultation fee
                </label>
                <Input
                  id="fee"
                  inputMode="numeric"
                  value={profile.fee?.toString() ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, fee: e.target.value ? Number(e.target.value) : undefined }))}
                  placeholder="500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="city">
                  City
                </label>
                <Input
                  id="city"
                  value={profile.city ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                  placeholder="Mumbai"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="languages">
                  Languages (comma separated)
                </label>
                <Input
                  id="languages"
                  value={languageText}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      languages: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="English, Hindi"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                className="min-h-28 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-50/10"
                value={profile.bio ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                placeholder="Brief introduction, experience, etc."
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
                {error}
              </p>
            ) : null}

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : "Save changes"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  location.href = "/doctor";
                }}
              >
                Back
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

