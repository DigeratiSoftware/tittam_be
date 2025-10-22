import mongoose, { Document, Schema } from "mongoose";
import { Counter } from "./user.model"; // reuse counter

export interface IZone extends Document {
  zoneId: string; // ZONE001
  nameEnglish: string;
  nameTamil: string;
  remark: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateZoneRequest {
  nameEnglish: string;
  nameTamil: string;
  remark: string;
}

const zoneSchema = new Schema<IZone>(
  {
    zoneId: { type: String, unique: true },
    nameEnglish: { type: String, required: true },
    nameTamil: { type: String, required: true },
    remark: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

// Auto-increment zoneId
zoneSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "zoneId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.zoneId = `ZONE${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else next();
});

export const Zone = mongoose.model<IZone>("Zone", zoneSchema);
