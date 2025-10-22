import mongoose, { Document, Schema } from "mongoose";
import { Counter } from "./user.model"; // 🔹 reuse Counter model like Scheme

export type ComponentStatus = "ACTIVE" | "INACTIVE";

export interface IComponent extends Document {
  componentId: string; // COMP001 format
  englishName: string;
  tamilName: string;
  componentTypeEnglish: string;
  componentTypeTamil: string;
  normalizedEnglishName: string;
  remark: string;
  status: ComponentStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateComponentRequest {
  englishName: string;
  tamilName: string;
  componentType: string;
  remark: string;
}

export const COMPONENT_STATUS: ComponentStatus[] = ["ACTIVE", "INACTIVE"];

const componentSchema = new Schema<IComponent>(
  {
    componentId: { type: String, unique: true }, // assigned via counter
    englishName: { type: String, required: true },
    tamilName: { type: String, required: true },
    componentTypeEnglish: { type: String, required: true },
    componentTypeTamil: { type: String, required: true },
    normalizedEnglishName: { type: String, required: true, unique: true },
    remark: { type: String },
    status: { type: String, enum: COMPONENT_STATUS, default: "ACTIVE" },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

// -------- Auto Increment for componentId using Counter Collection --------
componentSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "componentId" },        // 🔹 different namespace from schemeId
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.componentId = `COMP${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else {
    next();
  }
});

export const Component = mongoose.model<IComponent>("Component", componentSchema);
