"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Stethoscope } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Doctor = {
  _id: string;
  userId: string;
  specialty: string;
  bio?: string;
  fee?: number;
  city?: string;
  languages?: string[];
};

export function DoctorList({ initialDoctorId }: { initialDoctorId?: string | null }) {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch("/api/doctors");
      const data: unknown = await res.json().catch(() => null);
      const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
      const list = obj?.doctors;
      if (!alive) return;
      setDoctors(
        Array.isArray(list)
          ? (list as Doctor[]).map((d) => {
              const raw = d as unknown as Record<string, unknown>;
              return { ...d, _id: String(raw._id ?? "") };
            })
          : []
      );
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const canBook = !authLoading && user?.role === "patient";

  const preselected = useMemo(() => {
    if (!initialDoctorId) return null;
    return doctors.find((d) => String(d.userId) === String(initialDoctorId) || String(d._id) === String(initialDoctorId));
  }, [doctors, initialDoctorId]);

  return (
    <div className="space-y-4">
      {preselected ? (
        <Card className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <CardHeader>
            <CardTitle>Quick booking</CardTitle>  
            <CardDescription>
              You selected <span className="font-medium">{preselected.specialty}</span>. Continue to appointments to
              choose time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/appointments?doctorId=${encodeURIComponent(preselected.userId)}`}>
              <Button>Book appointment</Button>
            </Link>
          </CardContent>
        </Card>
      ) : null}

      {loading ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading doctors…</p>
      ) : doctors.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No doctors yet</CardTitle>
            <CardDescription>Once a doctor completes their profile, they’ll appear here.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {doctors.map((d) => (
            <Card key={d._id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-zinc-500" />
                      {d.specialty}
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      {d.city ? (
                        <>
                          <MapPin className="h-4 w-4" />
                          {d.city}
                        </>
                      ) : (
                        "Verified provider"
                      )}
                    </CardDescription>
                  </div>
                  {typeof d.fee === "number" ? <Badge>₹{d.fee}</Badge> : <Badge>Premium</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {d.bio ? <p className="text-sm text-zinc-600 dark:text-zinc-300">{d.bio}</p> : null}
                {d.languages?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {d.languages.slice(0, 5).map((l) => (
                      <Badge key={l}>{l}</Badge>
                    ))}
                  </div>
                ) : null}
                <div className="flex items-center gap-2">
                  <Link href={`/appointments?doctorId=${encodeURIComponent(d.userId)}`}>
                    <Button disabled={!canBook} variant={canBook ? "primary" : "secondary"} size="sm">
                      {canBook ? "Book" : "Login as patient to book"}
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigator.clipboard?.writeText(String(d.userId)).catch(() => null)}
                  >
                    Copy ID
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

