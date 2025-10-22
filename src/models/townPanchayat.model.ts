import mongoose, { Document, Schema } from "mongoose";
import { Counter } from "./user.model";

export interface ITownPanchayat extends Document {
  tpId: string; // TP001
  districtId: string;
  nameEnglish: string;
  nameTamil: string;
  remark: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTownPanchayatRequest {
  districtId: string;
  nameEnglish: string;
  nameTamil: string;
  remark: string;
}

const tpSchema = new Schema<ITownPanchayat>(
  {
    tpId: { type: String, unique: true },
    districtId: { type: String, required: true },
    nameEnglish: { type: String, required: true },
    nameTamil: { type: String, required: true },
    remark: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

tpSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "tpId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.tpId = `TP${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else next();
});

export const TownPanchayat = mongoose.model<ITownPanchayat>("TownPanchayat", tpSchema);
