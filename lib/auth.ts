import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import type { Role, SessionUser } from "@/types";

const COOKIE_NAME = "session";

function getSecret() {
  const secret = process.env.AUTH_SECRET ?? "dev-insecure-secret";
  return new TextEncoder().encode(secret); // our jose cannot understand string as secrect so it convert that into byte format Uint8Array (required by jose)
} 

export type SessionPayload = {
  sub: string;
  role: Role;
  name: string;
  email: string;
};

export async function signSession(user: SessionUser) {
  const expiresIn = "7d";
  return new SignJWT({
    role: user.role,
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" }) // 
    .setIssuedAt()
    .setSubject(user.id)
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
  const sub = typeof payload.sub === "string" ? payload.sub : undefined;
  const role = payload.role as Role | undefined;
  const name = typeof payload.name === "string" ? payload.name : undefined;
  const email = typeof payload.email === "string" ? payload.email : undefined;

  if (!sub || !role || !name || !email) return null;
  return { id: sub, role, name, email } satisfies SessionUser;
}

export function getSessionCookieFromRequest(req: NextRequest) {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

export async function getSessionFromRequest(req: NextRequest) {
  const token = getSessionCookieFromRequest(req);
  if (!token) return null;
  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

