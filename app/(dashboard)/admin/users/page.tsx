import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  if (!process.env.MONGODB_URI) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Database is not configured yet.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Missing environment variable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Set <span className="font-medium">MONGODB_URI</span> in your <span className="font-medium">.env.local</span>{" "}
              file and restart the dev server.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  await dbConnect();
  const users = await User.find().select({ name: 1, email: 1, role: 1, createdAt: 1 }).sort({ createdAt: -1 }).lean();
  type UserRow = {
    _id: unknown;
    name?: unknown;
    email?: unknown;
    role?: unknown;
    createdAt?: unknown;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">All registered accounts.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-zinc-500">
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Role</th>
                  <th className="py-3 pr-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {(users as unknown as UserRow[]).map((u) => (
                  <tr key={String(u._id ?? "")} className="border-b border-zinc-200/70 dark:border-zinc-800/60">
                    <td className="py-3 pr-4 font-medium">{String(u.name ?? "")}</td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-300">{String(u.email ?? "")}</td>
                    <td className="py-3 pr-4">
                      <Badge>{String(u.role ?? "")}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-300">
                      {u.createdAt ? new Date(String(u.createdAt)).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

