import * as React from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[--primary] text-white shadow-sm hover:bg-[--primary-600] hover:shadow-md focus-visible:ring-[--ring]",
  secondary:
    "bg-white text-[--foreground] shadow-sm ring-1 ring-[--border] hover:bg-slate-50 hover:shadow-md focus-visible:ring-[--ring] dark:bg-white/5 dark:hover:bg-white/10",
  ghost:
    "bg-transparent text-[--foreground] hover:bg-slate-100/70 focus-visible:ring-[--ring] dark:hover:bg-white/10",
  danger:
    "bg-[--danger] text-white shadow-sm hover:brightness-110 hover:shadow-md focus-visible:ring-[--ring]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ className, variant = "danger", size = "md", ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

