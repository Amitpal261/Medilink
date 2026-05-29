import { DoctorList } from "@/components/doctor/doctor-list";
import { Container } from "@/components/ui/container";

export const dynamic = "force-dynamic";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ doctorId?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage:
          'url("https://plus.unsplash.com/premium_vector-1724477408083-5b3456a876ed?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/70" />
      <Container className="relative py-16 sm:py-20 z-10">


        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Doctors</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Browse specialists and book your appointment in a premium flow.
            </p>
          </div>
          <DoctorList initialDoctorId={sp.doctorId ?? null} />
        </div>
      </Container>
      </div>
    
      );
}

