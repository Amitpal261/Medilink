import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { registerSchema } from "@/lib/validators/auth";
import { signSession, sessionCookieOptions } from "@/lib/auth";
import { serializeCookie } from "@/lib/cookies";
import { json, readValidatedJson } from "@/app/api/_utils";

export async function POST(req: Request) {
  const body = await readValidatedJson(req, registerSchema);
  if (!body.ok) return json({ error: "Invalid input", details: body.error }, { status: 400 });

  const { name, email, password, role } = body.data;

  await dbConnect();

  const existing = await User.findOne({ email }).lean();
  if (existing) return json({ error: "Email already in use" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);
  const created = await User.create({ name, email, passwordHash, role });

  const token = await signSession({
    id: created._id.toString(),
    role: created.role,
    name: created.name,
    email: created.email,
  });

  const res = json({
    user: { id: created._id.toString(), name: created.name, email: created.email, role: created.role },
  });
  res.headers.append("Set-Cookie", serializeCookie("session", token, sessionCookieOptions()));
  return res;
}

