"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { type AppointmentListItem, useAppointments } from "@/hooks/useAppointments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Doctor = { _id: string; userId: string; specialty: string; city?: string; fee?: number };

export function AppointmentsPanel() {
  const { user, loading: authLoading } = useAuth();
  const { appointments, loading, refresh } = useAppointments();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const sp = useSearchParams();
  const preselectDoctorId = sp.get("doctorId");

  const [doctorId, setDoctorId] = useState(preselectDoctorId ?? "");
  const [startsAt, setStartsAt] = useState<string>(() => {
    const d = new Date(Date.now() + 60 * 60 * 1000);
    d.setMinutes(0, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [reason, setReason] = useState("");

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
    })();
    return () => {
      alive = false;
    };
  }, []);

  const canCreate = !authLoading && user?.role === "patient";

  const selectedDoctor = useMemo(() => doctors.find((d) => String(d.userId) === String(doctorId)), [doctors, doctorId]);

  return (
    <div className="space-y-6">
      {canCreate ? (
        <Card>
          <CardHeader>
            <CardTitle>Book appointment</CardTitle>
            <CardDescription>Choose a doctor and pick a time.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setError(null);
                startTransition(async () => {
                  const res = await fetch("/api/appointments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ doctorId, startsAt: new Date(startsAt).toISOString(), reason: reason || undefined }),
                  });
                  const data: unknown = await res.json().catch(() => null);
                  const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
                  if (!res.ok) {
                    setError((typeof obj?.error === "string" ? obj.error : null) ?? "Failed to book");
                    return;
                  }
                  setReason("");
                  await refresh();
                });
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Doctor</label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-700 dark:focus:ring-zinc-50/10"
                  required
                >
                  <option value="" disabled>
                    Select a doctor
                  </option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d.userId}>
                      {d.specialty}
                      {d.city ? ` — ${d.city}` : ""} {typeof d.fee === "number" ? ` (₹${d.fee})` : ""}
                    </option>
                  ))}
                </select>
                {selectedDoctor ? (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Booking with <span className="font-medium">{selectedDoctor.specialty}</span>.
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Start time</label>
                <Input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Reason (optional)</label>
                <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. fever, headache…" />
              </div>

              {error ? (
                <p className="md:col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
                  {error}
                </p>
              ) : null}

              <div className="md:col-span-2 flex items-center gap-2">
                <Button type="submit" disabled={pending}>
                  {pending ? "Booking…" : "Book now"}
                </Button>
                <Button type="button" variant="secondary" onClick={() => refresh()}>
                  Refresh list
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              {user ? "View and manage your appointments." : "Login to view and manage your appointments."}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your appointment list</CardTitle>
          <CardDescription>Statuses can be updated by either side.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading…</p>
          ) : appointments.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-300">No appointments yet.</p>
          ) : (
            <div className="space-y-3">
              {appointments.map((a) => (
                <AppointmentRow key={String(a._id)} appt={a} onChanged={refresh} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AppointmentRow({ appt, onChanged }: { appt: AppointmentListItem; onChanged: () => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-zinc-800/60 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <p className="font-medium">Appointment</p>
          <p className="text-zinc-600 dark:text-zinc-300">
            {appt.startsAt ? new Date(appt.startsAt).toLocaleString() : "—"}
          </p>
        </div>
        <Badge>{appt.status}</Badge>
      </div>
      {appt.reason ? <p className="text-sm text-zinc-600 dark:text-zinc-300">{appt.reason}</p> : null}
      <div className="flex flex-wrap items-center gap-2">
        {["confirmed", "cancelled", "completed"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={s === "cancelled" ? "danger" : "secondary"}
            disabled={pending}
            onClick={() => {
              setError(null);
              startTransition(async () => {
                const res = await fetch(`/api/appointments/${encodeURIComponent(String(appt._id))}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: s }),
                });
                const data: unknown = await res.json().catch(() => null);
                const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
                if (!res.ok) {
                  setError((typeof obj?.error === "string" ? obj.error : null) ?? "Failed to update");
                  return;
                }
                onChanged();
              });
            }}
          >
            Mark {s}
          </Button>
        ))}
      </div>
      {error ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}

