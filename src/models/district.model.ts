import mongoose, { Document, Schema } from "mongoose";
import { Counter } from "./user.model";

export interface IDistrict extends Document {
  districtId: string; // DIST001
  zoneId: string;
  nameEnglish: string;
  nameTamil: string;
  remark: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDistrictRequest {
  zoneId: string;
  nameEnglish: string;
  nameTamil: string;
  remark: string;
}

const districtSchema = new Schema<IDistrict>(
  {
    districtId: { type: String, unique: true },
    zoneId: { type: String, required: true },
    nameEnglish: { type: String, required: true },
    nameTamil: { type: String, required: true },
    remark: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

districtSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "districtId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.districtId = `DIST${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else next();
});

export const District = mongoose.model<IDistrict>("District", districtSchema);
