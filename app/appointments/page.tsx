import { Container } from "@/components/ui/container";
import { AppointmentsPanel } from "@/components/appointment/appointments-panel";

export const dynamic = "force-dynamic";

export default function AppointmentsPage() {
  return (
    <Container className="py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Appointments</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Book and manage visits with a clean premium workflow.
          </p>
        </div>
        <AppointmentsPanel />
      </div>
    </Container>
  );
}

