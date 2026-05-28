import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { GitHub, Linkedin, X } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[--border] bg-white/60 backdrop-blur dark:bg-black/20">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
              PremiumCare is a modern doctor appointment platform—fast bookings, clean workflows, and a calm premium
              experience for patients and clinics.
            </p>
            <div className="flex items-center gap-2">
              <IconLink href="#" label="X">
                <X className="h-4 w-4" />
              </IconLink>
              <IconLink href="#" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </IconLink>
              <IconLink href="#" label="GitHub">
                <GitHub className="h-4 w-4" />
              </IconLink>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <FooterCol title="Product">
              <FooterLink href="/doctors">Find doctors</FooterLink>
              <FooterLink href="/appointments">Appointments</FooterLink>
              <FooterLink href="/patient">Patient dashboard</FooterLink>
              <FooterLink href="/doctor">Doctor dashboard</FooterLink>
            </FooterCol>
            <FooterCol title="Company">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
            </FooterCol>
            <FooterCol title="Support">
              <FooterLink href="#">Help center</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Status</FooterLink>
              <FooterLink href="#">Security</FooterLink>
            </FooterCol>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Newsletter</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Monthly product updates—no spam, unsubscribe anytime.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="h-11 w-full rounded-2xl border border-[--border] bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-[--ring] dark:bg-white/5 dark:text-white"
                placeholder="you@clinic.com"
                type="email"
                required
              />
              <Button type="submit" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[--border] pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
          <p>© {new Date().getFullYear()} PremiumCare. All rights reserved.</p>
          <p>Built with Next.js App Router + Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href={href}>
      {children}
    </Link>
  );
}

function IconLink({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
  return (
    <a
      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-[--border] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5"
      href={href}
      aria-label={label}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

