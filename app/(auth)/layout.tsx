import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <Container className="grid min-h-[calc(100vh-4rem)] items-center py-10 lg:grid-cols-2 lg:gap-10">
        <div className="hidden lg:block">
          <h1 className="text-4xl font-semibold tracking-tight">
            Clinic-grade UX,{" "}
            <span className="text-zinc-600 dark:text-zinc-300">crafted for speed.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Sign in to access your dashboard, manage appointments, and keep everything in one elegant workspace.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-zinc-600 dark:text-zinc-300">
            <p>
              Prefer browsing first?{" "}
              <Link className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-white" href="/doctors">
                View doctors
              </Link>
              .
            </p>
          </div>
        </div>

        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Secure access with HttpOnly cookie sessions.</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </Container>
    </div>
  );
}

