import mongoose, { Schema } from "mongoose";
import { Counter } from "./user.model";

const WorkSchema = new Schema(
  {
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
    asDetails: { type: [Schema.Types.Mixed], default: [] },
    tsDetails: { type: [Schema.Types.Mixed], default: [] },
    fundDetails: { type: [Schema.Types.Mixed], default: [] },
    tenderDetails: { type: [Schema.Types.Mixed], default: [] },
    workDetails: { type: [Schema.Types.Mixed], default: [] },
    workProgress: { type: [Schema.Types.Mixed], default: [] },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },

    createdBy: { type: String, required: true },
    updatedBy: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// -------- Auto Increment for userId using Counter Collection --------
WorkSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "workId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.workId = `WRK${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else {
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

const WorkModel = mongoose.model<any>("Work", WorkSchema);

export default WorkModel;
