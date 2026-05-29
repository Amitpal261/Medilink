import { NextRequest } from "next/server";
import { json, readValidatedJson } from "@/app/api/_utils";
import { getSessionFromRequest } from "@/lib/auth";
import { updateAppointmentStatusSchema } from "@/lib/validators/appointments";
import { updateAppointmentStatus } from "@/services/appointment.service";

export async function PATCH(req: NextRequest, ctx: RouteContext<"/api/appointments/[id]">) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const body = await readValidatedJson(req, updateAppointmentStatusSchema);
  if (!body.ok) return json({ error: "Invalid input", details: body.error }, { status: 400 });

  const updated = await updateAppointmentStatus({ id, status: body.data.status, userId: session.id });
  if (!updated) return json({ error: "Not found" }, { status: 404 });

  return json({ appointment: updated });
}

