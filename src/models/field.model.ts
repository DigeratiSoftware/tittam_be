// models/field.model.ts
import mongoose, { Schema, Document } from "mongoose";

// Validation interface
export interface Validation {
  type: string; // matches dataType
  minLength?: number; // for text
  maxLength?: number; // for text
  minValue?: number;  // for number/date
  maxValue?: number;  // for number/date
  regex?: string;     // regex pattern (e.g. only text, only numbers)
  range?: string;     // e.g. "2020-2025" or "1-100"
  field1?: string;    // for cross-field validation
  field2?: string;
  operator?: string;  // e.g. ">", "<=", "=="
  dateAllowed?: "future" | "past" | "both" | "todayOnly"; // extended for date
}

export interface options {
  englishName: string;
  tamailName: string;
}

export interface Field {
  fieldId?: string;
  group: string;
  name: string;
  label?: string;
  dataType:
    | "text"
    | "number"
    | "date"
    | "dropdown"
    | "boolean"
    | "file"
    | "textarea"
    | "geoLocation"
    | "calculation"
  isRequired: boolean;
  options?: options; // static options
  lovApi?: string;    // if options are loaded via API
  dependentOn?: string; // parent field name (for dependent dropdowns)
  isDefault: boolean;
  order: number;
  type: "default" | "component";
  componentId: string | null;
  category: "Individual" | "Infrastructure";
  createdBy: string;
  createdAt: Date;
  isSubForm?: boolean;
  validation?: Validation;
  subFields?: Field[];
}

export interface IField extends Document, Field {}

// SubField schema (recursive)
const SubFieldSchema: Schema = new Schema({
  fieldId: { type: String },
  group: { type: String },
  name: { type: String, required: true },
  label: { type: String },
  dataType: { type: String, required: true },
  isRequired: { type: Boolean, required: true },
  options:{
    englishName: {
      type: String 
  },
    tamailName: {
      type: String 
  }
  } ,
  lovApi: { type: String },
  dependentOn: { type: String },
  isDefault: { type: Boolean, default: false },
  order: { type: Number, required: true },
  type: { type: String, enum: ["default", "component"], required: true },
  componentId: { type: String, default: null },
  category: { type: String, enum: ["Individual", "Infrastructure"], required: true },
  validation: {
    type: { type: String, required: true },
    minLength: { type: Number },
    maxLength: { type: Number },
    minValue: { type: Number },
    maxValue: { type: Number },
    regex: { type: String },
    range: { type: String },
    field1: { type: String },
    field2: { type: String },
    operator: { type: String },
    dateAllowed: { type: String, enum: ["future", "past", "both", "todayOnly"] }
  },
  isSubForm: { type: Boolean, default: false },
  subFields: [] // recursive
});

// Main Field schema
const FieldSchema: Schema = new Schema<IField>({
  fieldId: { type: String },
  group: { type: String, required: true },
  name: { type: String, required: true },
  label: { type: String },
  dataType: { type: String, required: true },
  isRequired: { type: Boolean, required: true },
  options:{
    englishName: { type: String },
    tamailName: { type: String }  
  },
  lovApi: { type: String },
  dependentOn: { type: String },
  isDefault: { type: Boolean, default: false },
  order: { type: Number, required: true },
  type: { type: String, enum: ["default", "component"], required: true },
  componentId: { type: String, default: null },
  category: { type: String, enum: ["Individual", "Infrastructure"], required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isSubForm: { type: Boolean, default: false },
  validation: {
    type: { type: String, required: true },
    minLength: { type: Number },
    maxLength: { type: Number },
    minValue: { type: Number },
    maxValue: { type: Number },
    regex: { type: String },
    range: { type: String },
    field1: { type: String },
    field2: { type: String },
    operator: { type: String },
    dateAllowed: { type: String, enum: ["future", "past", "both", "todayOnly"] }
  },
  subFields: [SubFieldSchema]
});

export const Field = mongoose.model<IField>("Field", FieldSchema);
