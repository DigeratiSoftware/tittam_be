import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  label: string;
  url: string;
  filename: string;
  storage: "local" | "aws";
}

const FileSchema = new Schema<IFile>(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
    storage: { type: String, enum: ["local", "aws"], required: true },
  },
  { timestamps: true }
);

export const FileModel = mongoose.model<IFile>("File", FileSchema);
