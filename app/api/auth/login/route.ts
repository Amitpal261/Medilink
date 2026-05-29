import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { loginSchema } from "@/lib/validators/auth";
import { signSession, sessionCookieOptions } from "@/lib/auth";
import { serializeCookie } from "@/lib/cookies";
import { json, readValidatedJson } from "@/app/api/_utils";

export async function POST(req: Request) {
  const body = await readValidatedJson(req, loginSchema);
  if (!body.ok) return json({ error: "Invalid input", details: body.error }, { status: 400 });

  const { email, password } = body.data;
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) return json({ error: "Invalid email or password" }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return json({ error: "Invalid email or password" }, { status: 401 });

  const token = await signSession({
    id: user._id.toString(),
    role: user.role,
    name: user.name,
    email: user.email,
  });

  const res = json({ user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role } });
  res.headers.append("Set-Cookie", serializeCookie("session", token, sessionCookieOptions()));
  return res;
}

