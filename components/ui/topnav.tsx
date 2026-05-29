import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { LogoutButton } from "@/components/forms/logout-button";
import { TopNavMobileMenu } from "@/components/ui/topnav-mobile-menu";

function dashboardPath(role?: string) {
  if (role === "admin") return "/admin";
  if (role === "doctor") return "/doctor";
  if (role === "patient") return "/patient";
  return "/login";
}

const navLinks = [
  { href: "/doctors", label: "Find Doctors" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#emergency", label: "Emergency" },
] as const;

const navLinkClass =
  "text-sm text-zinc-500 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400";

export async function TopNav() {
  const token = (await cookies()).get("session")?.value;
  // console.log("token : ",token)
  const session = token ? await verifySessionToken(token).catch(() => null) : null;
  // console.log('session :',session)

  const dashboardHref = session ? dashboardPath(session.role) : "/login";

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-zinc-100 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <div className="flex shrink-0 items-center">
          <Logo />
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClass}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <div className="flex items-center gap-2 pr-1">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden />
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Live</span>
              </div>
              <Link href={dashboardHref}>
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-xl px-3 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <TopNavMobileMenu session={session} dashboardHref={dashboardHref} />
      </Container>
    </header>
  );
}
