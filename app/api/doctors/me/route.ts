import { NextRequest } from "next/server";
import { json, readValidatedJson } from "@/app/api/_utils";
import { getSessionFromRequest } from "@/lib/auth";
import { upsertDoctorSchema } from "@/lib/validators/doctors";
import { dbConnect } from "@/lib/db";
import { Doctor } from "@/models/Doctor";

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const profile = await Doctor.findOne({ userId: session.id }).lean();
  return json({ profile });
}

export async function PUT(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, { status: 401 });
  if (!(session.role === "doctor" || session.role === "admin" ))
    return json({ error: "Forbidden" }, { status: 403 });

  const body = await readValidatedJson(req, upsertDoctorSchema);
  if (!body.ok) return json({ error: "Invalid input", details: body.error }, { status: 400 });

  await dbConnect();
  const profile = await Doctor.findOneAndUpdate(
    { userId: session.id },
    { $set: { ...body.data, userId: session.id } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return json({ profile });
}

