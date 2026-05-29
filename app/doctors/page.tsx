import Link from "next/link";
import { DoctorList } from "@/components/doctor/doctor-list";
import { Container } from "@/components/ui/container";

export const dynamic = "force-dynamic";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ doctorId?: string; specialty?: string }>;
}) {
  const sp = await searchParams;

  return (
    <div className="min-h-screen bg-black py-12 dark:bg-[--background] sm:py-16">
      <Container className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Find your{" "}
            <span className="relative inline-block">
              doctor
              <span
                className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-teal-500"
                aria-hidden
              />
            </span>
          </h1>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
            Verified specialists in Pune. Transparent fees. Instant booking.
          </p>
          <Link
            href="/triage"
            className="inline-block text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Not sure which doctor you need? → Try AI symptom check
          </Link>
        </header>

        <DoctorList
          initialDoctorId={sp.doctorId ?? null}
          initialSpecialty={sp.specialty ?? null}
        />
      </Container>
    </div>
  );
}
