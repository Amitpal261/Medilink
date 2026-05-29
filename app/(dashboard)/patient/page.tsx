import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PatientDashboard() {
  const token = (await cookies()).get("session")?.value;
  const user = token ? await verifySessionToken(token).catch(() => null) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Patient dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Welcome back{user ? `, ${user.name}` : ""}. Book appointments and track your visits.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Book a doctor</CardTitle>
            <CardDescription>Find the right specialist and reserve a slot.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctors">
              <Button>Browse doctors</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your appointments</CardTitle>
            <CardDescription>Upcoming and past visits in one place.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/appointments">
              <Button variant="secondary">View appointments</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

