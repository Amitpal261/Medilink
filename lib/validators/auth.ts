import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8).max(72),
  role: z.enum(["patient", "doctor", "admin"]).default("patient"),
});

export const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(1).max(72),
});

