"use client";

import { useCallback, useEffect, useState } from "react";

export type AppointmentListItem = {
  _id: string;
  patientId?: string;
  doctorId?: string;
  startsAt?: string;
  reason?: string;
  status?: string;
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/appointments");
    const data: unknown = await res.json().catch(() => null);
    const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
    const appts = obj?.appointments;
    setAppointments(
      Array.isArray(appts)
        ? appts
            .map((a) => (a && typeof a === "object" ? (a as Record<string, unknown>) : null))
            .filter(Boolean)
            .map((a) => ({
              _id: String(a?._id ?? ""),
              patientId: a?.patientId ? String(a.patientId) : undefined,
              doctorId: a?.doctorId ? String(a.doctorId) : undefined,
              startsAt: typeof a?.startsAt === "string" ? a.startsAt : a?.startsAt ? String(a.startsAt) : undefined,
              reason: typeof a?.reason === "string" ? a.reason : undefined,
              status: typeof a?.status === "string" ? a.status : undefined,
            }))
        : []
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    // Avoid synchronous setState in effect body
    queueMicrotask(() => {
      void refresh();
    });
  }, [refresh]);

  return { appointments, loading, refresh, setAppointments };
}

