import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import type { Role } from "@/types";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["patient", "doctor", "admin"], default: "patient" satisfies Role },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

export const User: Model<UserDoc> = mongoose.models.User ?? mongoose.model("User", userSchema);

