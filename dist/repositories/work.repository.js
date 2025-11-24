"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workRepository = void 0;
const work_model_1 = __importDefault(require("../models/work.model"));
exports.workRepository = {
    create: async (payload) => {
        return await work_model_1.default.create(payload);
    },
    findAll: async (filter, pagination) => {
        const { skip, limit } = pagination;
        const pipeline = [
            { $match: filter },
            // Final projection
            {
                $project: {
                    _id: 1,
                    workId: 1,
                    workName: 1,
                    status: 1,
                    createdBy: 1,
                    createdAt: 1,
                    schemeName: 1,
                    componentName: 1
                }
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
        ];
        return await work_model_1.default.aggregate(pipeline);
    },
    search: async (search, pagination) => {
        const { skip, limit } = pagination;
        const pipeline = [
            {
                $match: {
                    $text: { $search: search }
                }
            },
            {
                $project: {
                    _id: 1,
                    workId: 1,
                    workName: 1,
                    status: 1,
                    createdBy: 1,
                    createdAt: 1,
                    schemeName: 1,
                    componentName: 1
                }
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
        ];
        return await work_model_1.default.aggregate(pipeline);
    },
    findByWorkId: async (workId) => {
        return work_model_1.default.findOne({ workId: workId }).lean();
    },
    updateByWorkId: async (workId, payload) => {
        return work_model_1.default.findOneAndUpdate({ workId: workId }, payload, { new: true }).lean();
    },
    deleteByWorkId: async (workId) => {
        return work_model_1.default.findOneAndDelete({ workId: workId });
    },
    //   search: async (keyword: string, { skip = 0, limit = 50 }) => {
    //     if (!keyword) {
    //       return WorkModel.find().skip(skip).limit(limit).lean();
    //     }
    //     return WorkModel.find({
    //       $text: { $search: keyword },
    //     })
    //       .skip(skip)
    //       .limit(limit)
    //       .lean();
    //   },
};
