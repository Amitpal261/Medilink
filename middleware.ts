import { NextResponse, type NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

const authPages = ["/login", "/register"];

function isPathOneOf(path: string, items: string[]) {
  return items.some((p) => path === p || path.startsWith(`${p}/`));
}

function dashboardForRole(role: string) {
  if (role === "admin") return "/admin";
  if (role === "doctor") return "/doctor";
  return "/patient";
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthPage = isPathOneOf(path, authPages);

  const isProtected =
    isPathOneOf(path, ["/patient", "/doctor", "/admin", "/appointments"]) ||
    isPathOneOf(path, ["/api/users", "/api/appointments", "/api/doctors/me"]);

  const session = await getSessionFromRequest(req);

  if (!session && isProtected) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (session && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = dashboardForRole(session.role);
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (session) {
    if (isPathOneOf(path, ["/admin"]) && session.role !== "admin") {
      return NextResponse.redirect(new URL(dashboardForRole(session.role), req.url));
    }
    if (isPathOneOf(path, ["/doctor"]) && !(session.role === "doctor" || session.role === "admin")) {
      return NextResponse.redirect(new URL(dashboardForRole(session.role), req.url));
    }
    if (isPathOneOf(path, ["/patient"]) && session.role !== "patient") {
      return NextResponse.redirect(new URL(dashboardForRole(session.role), req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)"],
};

