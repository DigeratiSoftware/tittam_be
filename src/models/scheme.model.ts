import mongoose, { Document, Schema } from "mongoose";
import { Counter } from "./user.model"; // <-- reuse the Counter model from user.model

// =====================
// Scheme Interface & Schema
// =====================
export type SchemeStatus = 'ACTIVE' | 'INACTIVE';

export interface CreateSchemeRequest {
  englishName: string;
  tamilName: string;
  englishAbbreviation: string;
  normalizedEnglishName: string;
  remark: string;
}

export interface IScheme extends Document {
  schemeId: string; // custom id like SCHEM001
  englishName: string;
  tamilName: string;
  englishAbbreviation: string;
  normalizedEnglishName: string; // new field
  remark: string;
  status: SchemeStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schemeSchema = new Schema<IScheme>(
  {
    schemeId: { type: String, unique: true }, // assigned via counter
    englishName: { type: String, required: true },
    tamilName: { type: String, required: true },
    englishAbbreviation: { type: String, required: true },
    normalizedEnglishName: { type: String, required: true, unique: true }, // new field
    remark: { type: String },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

// -------- Auto Increment for schemeId using Counter Collection --------
schemeSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "schemeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.schemeId = `SCHEM${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else {
    next();
  }
});

export const Scheme = mongoose.model<IScheme>("Scheme", schemeSchema);
