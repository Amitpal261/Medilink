import Link from "next/link";
import {
  Brain,
  Calendar,
  CalendarCheck,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const gridPattern = {
  backgroundImage: `
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
};

const features: {
  icon: typeof Brain;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  id?: string;
}[] = [
  {
    icon: Brain,
    title: "AI Triage",
    description: "Tell us your symptoms. We route you to the right specialist in seconds.",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-500",
  },
  {
    icon: Calendar,
    title: "Instant Booking",
    description: "See real availability. Book in one tap. Get WhatsApp confirmation.",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Verified Doctors",
    description: "Every doctor is license-verified before going live.",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-500",
  },
  {
    icon: Zap,
    title: "Emergency Mode",
    description: "One tap connects you to the nearest available doctor. Always.",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    id: "emergency",
  },
];

const steps = [
  {
    step: 1,
    title: "Describe your symptoms",
    description: "Chat with our AI triage — share what you feel in plain language.",
    icon: MessageSquare,
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-500",
  },
  {
    step: 2,
    title: "Get matched instantly",
    description: "We surface the right specialist from our verified network.",
    icon: Stethoscope,
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
  },
  {
    step: 3,
    title: "Book & get care",
    description: "Pick a slot, confirm on WhatsApp, and show up prepared.",
    icon: CalendarCheck,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#0a0f14] text-white"
        style={gridPattern}
      >
        <div
          className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"
          aria-hidden
        />

        <Container className="relative z-10 py-24 sm:py-28">
          <div className="max-w-3xl space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              Trusted by 500+ doctors in Pune
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Find the right doctor.
              <br />
              In 60 seconds.
            </h1>

            <p className="max-w-lg text-lg text-zinc-400">
              AI-powered triage tells you exactly which specialist you need — then books them instantly.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/doctors"
                className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-teal-400"
              >
                Find my doctor
              </Link>
              <Link
                href="/doctor"
                className="text-sm text-zinc-400 underline transition-colors hover:text-white"
              >
                For doctors →
              </Link>
            </div>

            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
              <span>50+ Doctors</span>
              <span aria-hidden>•</span>
              <span>1,200+ Bookings</span>
              <span aria-hidden>•</span>
              <span>4.9★ Rating</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-[#f8fafb] py-24 dark:bg-zinc-50/5">
        <Container>
          <h2 className="mb-12 max-w-xl text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Everything you need. Nothing you don&apos;t.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map(({ icon: Icon, title, description, iconBg, iconColor, id }) => (
              <article
                key={title}
                id={id}
                className="card-hover rounded-2xl border border-zinc-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-zinc-100 bg-white py-24 dark:border-zinc-800 dark:bg-[#0a0f14]">
        <Container>
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            How it works
          </h2>

          <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            <div
              className="pointer-events-none absolute top-14 hidden h-px border-t border-dashed border-zinc-200 md:left-[16.67%] md:right-[16.67%] md:block dark:border-zinc-700"
              aria-hidden
            />

            {steps.map(({ step, title, description, icon: Icon, iconBg, iconColor }) => (
              <div key={step} className="relative flex flex-col items-center text-center md:items-center">
                <div className="relative z-10 mb-6 flex flex-col items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                    {step}
                  </span>
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 ${iconBg}`}
                  >
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
                <p className="max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0f14] py-24 text-center text-white">
        <Container className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to find your doctor?</h2>
          <p className="max-w-md text-zinc-400">
            Join thousands of patients in Pune who book smarter with MediLink.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-teal-400"
          >
            Get started free
          </Link>
        </Container>
      </section>
    </>
  );
}
