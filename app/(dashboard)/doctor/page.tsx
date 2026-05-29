import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DoctorDashboard() {
  const token = (await cookies()).get("session")?.value;
  const user = token ? await verifySessionToken(token).catch(() => null) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Doctor dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Welcome back{user ? `, Dr. ${user.name}` : ""}. Manage your profile and appointments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doctor profile</CardTitle>
            <CardDescription>Update specialty, fee, city and languages.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor/profile">
              <Button>Edit profile</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Confirm, cancel, and manage upcoming visits.</CardDescription>
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

