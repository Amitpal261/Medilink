import { json } from "@/app/api/_utils";
import { serializeCookieDelete } from "@/lib/cookies";

export async function POST() {
  const res = json({ ok: true });
  res.headers.append("Set-Cookie", serializeCookieDelete("session"));
  return res;
}

