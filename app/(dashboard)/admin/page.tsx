import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const token = (await cookies()).get("session")?.value;
  const user = token ? await verifySessionToken(token).catch(() => null) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Manage users and monitor system activity{user ? ` — signed in as ${user.email}` : ""}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>View all registered accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/users">
              <Button>Open users</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doctors</CardTitle>
            <CardDescription>Review doctor profiles available to patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctors">
              <Button variant="secondary">View doctors</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

