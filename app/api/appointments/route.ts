import { NextRequest } from "next/server";
import { json, readValidatedJson } from "@/app/api/_utils";
import { getSessionFromRequest } from "@/lib/auth";
import { createAppointmentSchema } from "@/lib/validators/appointments";
import { createAppointment, listAppointmentsForUser } from "@/services/appointment.service";

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, { status: 401 });

  const appointments = await listAppointmentsForUser(session.id);
  return json({ appointments });
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "patient") return json({ error: "Only patients can book appointments" }, { status: 403 });

  const body = await readValidatedJson(req, createAppointmentSchema);
  if (!body.ok) return json({ error: "Invalid input", details: body.error }, { status: 400 });

  const appt = await createAppointment({
    patientId: session.id,
    doctorId: body.data.doctorId,
    startsAt: new Date(body.data.startsAt),
    reason: body.data.reason,
  });

  return json({ appointment: appt }, { status: 201 });
}

