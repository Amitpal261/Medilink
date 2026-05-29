import Link from "next/link";
import { Heart } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <Heart className="text-teal-500" size={18} />
      <span>
        <span className="font-bold text-teal-600">Medi</span>
        <span className="font-bold text-zinc-800 dark:text-zinc-100">Link</span>
      </span>
    </Link>
  );
}
