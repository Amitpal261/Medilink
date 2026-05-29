import Link from "next/link";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Create account</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Start booking appointments in minutes.</p>
      </div>
      <RegisterForm />
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Already have an account?{" "}
        <Link className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-white" href="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}

