"use client";

import { useEffect, useState } from "react";
import type { SessionUser } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch("/api/auth/me");
      const data: unknown = await res.json().catch(() => null);
      const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
      const u = obj?.user ?? null;
      if (!alive) return;
      setUser((u && typeof u === "object" ? (u as SessionUser) : null) ?? null);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { user, loading };
}

