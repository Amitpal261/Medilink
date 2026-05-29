import { dbConnect } from "@/lib/db";
import { Doctor } from "@/models/Doctor";

export async function listDoctors() {
  await dbConnect();
  return Doctor.find().sort({ createdAt: -1 }).lean();
}

export async function upsertDoctorProfile(userId: string, data: Record<string, unknown>) {
  await dbConnect();
  return Doctor.findOneAndUpdate(
    { userId },
    { $set: { ...data, userId } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
}

