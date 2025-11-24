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
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = require("./user.model");
const WorkSchema = new mongoose_1.Schema({
    workId: { type: String, unique: true }, // custom id like WRK001
    schemeId: { type: String, required: true, index: true },
    schemeName: { type: String, required: true },
    componentId: { type: String, required: true, index: true },
    componentName: { type: String, required: true },
    workName: { type: String },
    announcementScheme: { type: Boolean },
    flagshipScheme: { type: Boolean },
    district: { type: String },
    districtName: { type: String },
    townPanchayat: { type: String },
    townPanchayatName: { type: String },
    zone: { type: String },
    zoneName: { type: String },
    financialYear: { type: String },
    implementationAgency: { type: String },
    // Array sections (Flexible / Optional)
    asDetails: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    tsDetails: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    fundDetails: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    tenderDetails: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    workDetails: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    workProgress: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending",
    },
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
// -------- Auto Increment for userId using Counter Collection --------
WorkSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const counterDoc = await user_model_1.Counter.findByIdAndUpdate({ _id: "workId" }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.workId = `WRK${String(counterDoc.seq).padStart(3, "0")}`;
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
// Text search index
WorkSchema.index({
    workName: "text",
    district: "text",
    townPanchayat: "text",
    createdBy: "text",
    "tenderDetails.contractorName": "text",
    "workDetails.nameOfWorkEnglish": "text",
});
const WorkModel = mongoose_1.default.model("Work", WorkSchema);
exports.default = WorkModel;
