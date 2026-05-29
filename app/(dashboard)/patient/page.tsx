import Link from "next/link";
import { cookies } from "next/headers";
import { Brain, Calendar, Stethoscope } from "lucide-react";
import { verifySessionToken } from "@/lib/auth";
import { AppointmentsPanel } from "@/components/appointment/appointments-panel";

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatToday() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

type StatCard = {
  label: string;
  variant: "default" | "upcoming" | "completed" | "health";
  value: string;
};

const stats: StatCard[] = [
  { label: "Total Bookings", variant: "default", value: "0" },
  { label: "Upcoming", variant: "upcoming", value: "0" },
  { label: "Completed", variant: "completed", value: "0" },
  { label: "Health Score", variant: "health", value: "Good" },
];

const quickActions = [
  {
    title: "AI Symptom Check",
    description: "Not sure which doctor? Let AI guide you.",
    href: "/triage",
    icon: Brain,
    gradient: "from-teal-500 to-teal-600",
    iconBg: "bg-white/20",
  },
  {
    title: "Find a Doctor",
    description: "Browse verified specialists near you.",
    href: "/doctors",
    icon: Stethoscope,
    gradient: "from-indigo-500 to-indigo-600",
    iconBg: "bg-white/20",
  },
  {
    title: "My Appointments",
    description: "View upcoming and past visits.",
    href: "/appointments",
    icon: Calendar,
    gradient: "from-emerald-500 to-emerald-600",
    iconBg: "bg-white/20",
  },
] as const;

export default async function PatientDashboard() {
  const token = (await cookies()).get("session")?.value;
  const user = token ? await verifySessionToken(token).catch(() => null) : null;

  const greeting = getTimeGreeting();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-sm text-zinc-400">{formatToday()}</p>
      </header>

      <section aria-label="Overview">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              <div className="mt-2 flex items-center gap-2">
                {stat.variant === "health" ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">{stat.value}</span>
                  </>
                ) : stat.variant === "upcoming" ? (
                  <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-lg font-bold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                    {stat.value}
                  </span>
                ) : stat.variant === "completed" ? (
                  <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-lg font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {stat.value}
                  </span>
                ) : (
                  <span className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Quick actions">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">What do you need?</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickActions.map(({ title, description, href, icon: Icon, gradient, iconBg }) => (
            <Link
              key={href}
              href={href}
              className={`card-hover group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-md`}
            >
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/85">{description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-white/90 transition-transform group-hover:translate-x-0.5">
                Get started →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Recent appointments" className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Recent appointments</h2>
        <AppointmentsPanel />
      </section>
    </div>
  );
}
