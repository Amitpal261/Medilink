import { NextRequest } from "next/server";
import { json } from "@/app/api/_utils";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  return json({ user: session });
}

