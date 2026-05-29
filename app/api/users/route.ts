import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { getSessionFromRequest } from "@/lib/auth";
import { json } from "@/app/api/_utils";

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return json({ error: "Forbidden" }, { status: 403 });

  await dbConnect();
  const users = await User.find()
    .select({ name: 1, email: 1, role: 1, createdAt: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return json({ users });
}

