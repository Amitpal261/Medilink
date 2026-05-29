export type Role = "patient" | "doctor" | "admin";

export type SessionUser = {
  id: string;
  role: Role;
  name: string;
  email: string;
};

export type DoctorProfile = {
  userId: string;
  specialty: string;
  bio?: string;
  fee?: number;
  city?: string;
  languages?: string[];
};

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type AppointmentDTO = {
  id: string;
  patientId: string;
  doctorId: string;
  startsAt: string;
  reason?: string;
  status: AppointmentStatus;
};

