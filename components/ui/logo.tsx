import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
        <HeartPulse className="h-5 w-5" />
      </span>
      <span>PremiumCare</span>
    </Link>
  );
}

