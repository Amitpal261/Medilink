import { dbConnect } from "@/lib/db";
import { Appointment } from "@/models/Appointment";

export async function listAppointmentsForUser(userId: string) {
  await dbConnect();
  return Appointment.find({
    $or: [{ patientId: userId }, { doctorId: userId }],
  })
    .sort({ startsAt: 1 })
    .lean();
}

export async function createAppointment(input: {
  patientId: string;
  doctorId: string;
  startsAt: Date;
  reason?: string;
}) {
  await dbConnect();
  const appt = await Appointment.create({
    patientId: input.patientId,
    doctorId: input.doctorId,
    startsAt: input.startsAt,
    reason: input.reason,
    status: "pending",
  });
  return appt.toObject();
}

export async function updateAppointmentStatus(input: { id: string; status: string; userId: string }) {
  await dbConnect();
  const appt = await Appointment.findOneAndUpdate(
    { _id: input.id, $or: [{ patientId: input.userId }, { doctorId: input.userId }] },
    { $set: { status: input.status } },
    { new: true }
  ).lean();
  return appt;
}

