import { z } from "zod";

export const upsertDoctorSchema = z.object({
  specialty: z.string().min(2).max(100).trim(),
  bio: z.string().max(1200).optional(),
  fee: z.number().min(0).max(100000).optional(),
  city: z.string().max(120).optional(),
  languages: z.array(z.string().max(40)).max(20).optional(),
});

