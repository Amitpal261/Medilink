"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search, ShieldCheck, Stethoscope } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type Doctor = {
  _id: string;
  userId: string;
  specialty: string;
  bio?: string;
  fee?: number;
  city?: string;
  languages?: string[];
};

const SPECIALTY_FILTERS = [
  "All",
  "General Physician",
  "Cardiologist",
  "ENT",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
] as const;

function specialtyInitials(specialty: string) {
  const words = specialty.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
  }
  return specialty.slice(0, 2).toUpperCase();
}

function matchesSpecialtyFilter(doctorSpecialty: string, filter: string) {
  if (filter === "All") return true;
  const normalized = doctorSpecialty.toLowerCase();
  const needle = filter.toLowerCase();
  if (needle === "ent") {
    return normalized.includes("ent") || normalized.includes("ear") || normalized.includes("nose");
  }
  return normalized.includes(needle);
}

function matchesSearch(doctor: Doctor, query: string) {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const haystack = [doctor.specialty, doctor.city, doctor.bio, ...(doctor.languages ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export function DoctorList({
  initialDoctorId,
  initialSpecialty,
}: {
  initialDoctorId?: string | null;
  initialSpecialty?: string | null;
}) {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState(() => {
    if (!initialSpecialty) return "All";
    const match = SPECIALTY_FILTERS.find(
      (f) => f !== "All" && initialSpecialty.toLowerCase().includes(f.toLowerCase())
    );
    return match ?? "All";
  });

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
    return doctors.find(
      (d) => String(d.userId) === String(initialDoctorId) || String(d._id) === String(initialDoctorId)
    );
  }, [doctors, initialDoctorId]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(
      (d) => matchesSpecialtyFilter(d.specialty, specialtyFilter) && matchesSearch(d, searchQuery)
    );
  }, [doctors, specialtyFilter, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by specialty, name, or city..."
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {SPECIALTY_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSpecialtyFilter(filter)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                specialtyFilter === filter
                  ? "border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300"
                  : "border-zinc-200 text-zinc-600 hover:border-teal-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-teal-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {preselected ? (
        <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 dark:border-teal-900/40 dark:bg-teal-950/20">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Quick booking</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            You selected <span className="font-medium">{preselected.specialty}</span>. Continue to appointments to
            choose time.
          </p>
          <Link
            href={`/appointments?doctorId=${encodeURIComponent(preselected.userId)}`}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            Book appointment
          </Link>
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <DoctorCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredDoctors.length === 0 ? (
        <EmptyState hasDoctors={doctors.length > 0} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredDoctors.map((d) => (
            <DoctorCard key={d._id} doctor={d} canBook={canBook} />
          ))}
        </div>
      )}
    </div>
  );
}

function DoctorCard({ doctor: d, canBook }: { doctor: Doctor; canBook: boolean }) {
  return (
    <article className="card-hover flex flex-col rounded-2xl border border-zinc-100 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white"
            aria-hidden
          >
            {specialtyInitials(d.specialty)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{d.specialty}</h3>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-teal-600 dark:text-teal-400">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Verified
            </span>
          </div>
        </div>
      </div>

      {d.city ? (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          {d.city}
        </p>
      ) : null}

      <div className="mt-4 flex items-baseline gap-1">
        {typeof d.fee === "number" ? (
          <>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">₹{d.fee}</span>
            <span className="text-sm text-zinc-400">/consultation</span>
          </>
        ) : (
          <span className="text-2xl font-bold text-zinc-900 dark:text-white">—</span>
        )}
      </div>

      {d.languages?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {d.languages.slice(0, 5).map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {lang}
            </span>
          ))}
        </div>
      ) : null}

      {d.bio ? (
        <p className="mt-3 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{d.bio}</p>
      ) : null}

      <div className="mt-5">
        {canBook ? (
          <Link
            href={`/appointments?doctorId=${encodeURIComponent(d.userId)}`}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-teal-600 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            Book appointment →
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex h-11 w-full items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Login as patient to book
          </Link>
        )}
      </div>
    </article>
  );
}

function DoctorCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-100 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-2/3 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="mt-4 h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-4 h-8 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-3 h-10 w-full rounded-xl bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}

function EmptyState({ hasDoctors }: { hasDoctors: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950/40">
        <Stethoscope className="h-8 w-8 text-teal-500" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        {hasDoctors ? "No doctors match your search" : "No doctors available yet"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        {hasDoctors
          ? "Try a different specialty filter or search term."
          : "We are onboarding verified specialists in Pune."}
      </p>
      {!hasDoctors ? (
        <Link
          href="/doctor"
          className="mt-6 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400"
        >
          Be the first to join →
        </Link>
      ) : null}
    </div>
  );
}
