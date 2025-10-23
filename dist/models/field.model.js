"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
// models/field.model.ts
const mongoose_1 = __importStar(require("mongoose"));
// SubField schema (recursive)
const SubFieldSchema = new mongoose_1.Schema({
    fieldId: { type: String },
    group: { type: String },
    name: { type: String, required: true },
    label: { type: String },
    dataType: { type: String, required: true },
    isRequired: { type: Boolean, required: true },
    options: {
        englishName: {
            type: String
        },
        tamailName: {
            type: String
        }
    },
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
const FieldSchema = new mongoose_1.Schema({
    fieldId: { type: String },
    group: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String },
    dataType: { type: String, required: true },
    isRequired: { type: Boolean, required: true },
    options: {
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
exports.Field = mongoose_1.default.model("Field", FieldSchema);
