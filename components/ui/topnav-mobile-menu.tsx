"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/forms/logout-button";

const navLinks = [
  { href: "/doctors", label: "Find Doctors" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#emergency", label: "Emergency" },
] as const;

const linkClass =
  "text-sm text-zinc-500 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400";

type TopNavMobileMenuProps = {
  session: { role: string } | null;
  dashboardHref: string;
};

export function TopNavMobileMenu({ session, dashboardHref }: TopNavMobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-16 z-50 border-b border-zinc-100 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl sm:px-6 dark:border-zinc-800/60 dark:bg-zinc-950/95">
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={`rounded-lg px-3 py-2.5 ${linkClass}`} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800/60">
              {session ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden />
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Live</span>
                  </div>
                  <Link href={dashboardHref} onClick={() => setOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full">
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
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <span className="inline-flex h-9 w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700">
                      Get Started
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
