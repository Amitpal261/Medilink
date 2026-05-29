export function serializeCookie(name: string, value: string, opts: { path?: string; httpOnly?: boolean; secure?: boolean; sameSite?: "lax" | "strict" | "none"; maxAge?: number }) {
  const parts: string[] = [`${name}=${encodeURIComponent(value)}`];
  if (opts.path) parts.push(`Path=${opts.path}`);
  if (opts.httpOnly) parts.push("HttpOnly");
  if (opts.secure) parts.push("Secure");
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite}`);
  if (typeof opts.maxAge === "number") parts.push(`Max-Age=${opts.maxAge}`);
  return parts.join("; ");
}

export function serializeCookieDelete(name: string) {
  return `${name}=; Path=/; Max-Age=0`;
}

