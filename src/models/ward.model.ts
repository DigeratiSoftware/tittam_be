import mongoose, { Document, Schema } from "mongoose";
import { Counter } from "./user.model";

export interface IWard extends Document {
  wardId: string; // WARD001
  townPanchayatId: string;
  nameEnglish: string;
  nameTamil: string;
  remark: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWardRequest {
  townPanchayatId: string;
  nameEnglish: string;
  nameTamil: string;
  remark: string;
}

const wardSchema = new Schema<IWard>(
  {
    wardId: { type: String, unique: true },
    townPanchayatId: { type: String, required: true },
    nameEnglish: { type: String, required: true },
    nameTamil: { type: String, required: true },
    remark: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

wardSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "wardId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.wardId = `WARD${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else next();
});

export const Ward = mongoose.model<IWard>("Ward", wardSchema);
