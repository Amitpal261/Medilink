import Link from "next/link";
import { CalendarCheck, ShieldCheck, Stethoscope, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { url } from "inspector";

export default function Home() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundImage: 
          'url("https://images.unsplash.com/vector-1739803316910-1de9cb66fc2d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', 
      }}
      // Add a black overlay
      >
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/70" />
    
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-300/40 via-sky-300/30 to-fuchsia-300/30 blur-3xl dark:from-emerald-500/20 dark:via-sky-500/10 dark:to-fuchsia-500/10" />
      </div>

      <Container className="relative py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Premium doctor experience
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Book doctors. Manage clinics.{" "}
              <span className="text-zinc-600 dark:text-zinc-300">All in one place.</span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              A production-ready foundation with secure cookie sessions, role-based dashboards, doctor profiles, and
              appointment booking — styled like a premium healthcare app.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/doctors">
                <Button size="lg" className="w-full border border-white sm:w-auto transition-transform duration-300 ease-out hover:translate-y-[-3px]">
                  Explore doctors
                </Button>
              </Link>
              <Link href="/register" >
                <Button size="lg" variant="danger" className="w-full text-black bg-white hover:bg-white/80 transition-transform duration-300 ease-out hover:translate-y-[-3px] sm:w-auto">
                  Create account
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={<CalendarCheck />}
              title="Appointments"
              textColor="text-white"
              bgColor="bg-red-500/10"
            >
              Create, confirm, and track visits with a clean workflow.
            </FeatureCard>
            <FeatureCard
              icon={<ShieldCheck />}
              title="Secure sessions"
              textColor="text-green-600"
              bgColor="bg-green-500/10"
            >
              HttpOnly cookie sessions signed with Jose (JWT).
            </FeatureCard>
            <FeatureCard
              icon={<Users />}
              title="Role dashboards"
              textColor="text-blue-600"
              bgColor="bg-blue-500/10"
            >
              Patient, Doctor, and Admin areas with middleware protection.
            </FeatureCard>
            <FeatureCard
              icon={<Stethoscope />}
              title="Doctor profiles"
              textColor="text-yellow-600"
              bgColor="bg-yellow-500/10"
            >
              Specialty, fee, city, languages — ready for real data.
            </FeatureCard>
          </div>
        </div>
      </Container>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  textColor,
  bgColor,
  children,
}: {
  icon: ReactNode;
  title: string;
  textColor: string;
  bgColor: string;
  children: ReactNode;
}) {
  return (
    <Card className={`border border-white/20 backdrop-blur-xl shadow-sm transition-transform duration-300 ease-out hover:translate-y-[-3px]`}>
      <CardHeader className="flex flex-row items-center gap-3 pb-0">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 backdrop-blur border border-white/20">
          {icon}
        </div>

        <CardTitle >{title}</CardTitle>
      </CardHeader>

      <CardContent className={`pt-3 text-sm leading-6`}>
        {children}
      </CardContent>
    </Card>
  );
}
