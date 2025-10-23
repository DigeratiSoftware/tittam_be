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
exports.Scheme = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = require("./user.model"); // <-- reuse the Counter model from user.model
const schemeSchema = new mongoose_1.Schema({
    schemeId: { type: String, unique: true }, // assigned via counter
    englishName: { type: String, required: true },
    tamilName: { type: String, required: true },
    englishAbbreviation: { type: String, required: true },
    normalizedEnglishName: { type: String, required: true, unique: true }, // new field
    remark: { type: String },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    createdBy: { type: String },
    updatedBy: { type: String },
}, { timestamps: true });
// -------- Auto Increment for schemeId using Counter Collection --------
schemeSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const counterDoc = await user_model_1.Counter.findByIdAndUpdate({ _id: "schemeId" }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.schemeId = `SCHEM${String(counterDoc.seq).padStart(3, "0")}`;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    else {
        next();
    }
});
exports.Scheme = mongoose_1.default.model("Scheme", schemeSchema);
