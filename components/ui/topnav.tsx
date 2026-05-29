import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { LogoutButton } from "@/components/forms/logout-button";

function dashboardPath(role?: string) {
  if (role === "admin") return "/admin";
  if (role === "doctor") return "/doctor";
  if (role === "patient") return "/patient";
  return "/login";
}

export async function TopNav() {
  const token = (await cookies()).get("session")?.value;
  // console.log("token : ",token)
  const session = token ? await verifySessionToken(token).catch(() => null) : null;
  // console.log('session :',session)

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex dark:text-zinc-300">
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/doctors">
              Doctors
            </Link>
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/appointments">
              Appointments
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link href={dashboardPath(session.role)}>
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Create account
                </Button>
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}

