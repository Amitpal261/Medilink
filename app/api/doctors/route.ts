import { NextRequest } from "next/server";
import { json, readValidatedJson } from "@/app/api/_utils";
import { getSessionFromRequest } from "@/lib/auth";
import { upsertDoctorSchema } from "@/lib/validators/doctors";
import { listDoctors, upsertDoctorProfile } from "@/services/doctor.service";

export async function GET() {
  const doctors = await listDoctors();
  return json({ doctors });
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, { status: 401 });
  if (!(session.role === "doctor" || session.role === "admin" || session.role === 'patient'))
    return json({ error: "Forbidden" }, { status: 403 });

  const body = await readValidatedJson(req, upsertDoctorSchema);
  if (!body.ok) return json({ error: "Invalid input", details: body.error }, { status: 400 });

  const profile = await upsertDoctorProfile(session.id, body.data);
  return json({ profile });
}

