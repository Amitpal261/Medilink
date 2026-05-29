import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Sign in</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Use your email and password to continue.</p>
      </div>
      <Suspense fallback={<p className="text-sm text-zinc-600 dark:text-zinc-300">Loading…</p>}>
        <LoginForm />
      </Suspense>
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        New here?{" "}
        <Link className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-white" href="/register">
          Create an account
        </Link>
      </p>
    </div>
  );
}

