import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const appointmentSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    startsAt: { type: Date, required: true, index: true },
    reason: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

export type AppointmentDoc = InferSchemaType<typeof appointmentSchema> & { _id: mongoose.Types.ObjectId };
export const Appointment: Model<AppointmentDoc> =
  mongoose.models.Appointment ?? mongoose.model("Appointment", appointmentSchema);

