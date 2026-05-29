import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctorId: z.string().min(1),
  startsAt: z.string().datetime(),
  reason: z.string().max(500).optional(),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

