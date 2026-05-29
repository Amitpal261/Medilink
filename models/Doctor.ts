import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const doctorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    specialty: { type: String, required: true, trim: true },
    bio: { type: String },
    fee: { type: Number },
    city: { type: String },
    languages: [{ type: String }],
  },
  { timestamps: true }
);

export type DoctorDoc = InferSchemaType<typeof doctorSchema> & { _id: mongoose.Types.ObjectId };
export const Doctor: Model<DoctorDoc> = mongoose.models.Doctor ?? mongoose.model("Doctor", doctorSchema);

