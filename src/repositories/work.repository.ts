import WorkModel from "../models/work.model";
import mongoose from "mongoose";

export const workRepository = {
  create: async (payload: any) => {
    return await WorkModel.create(payload);
  },

 findAll: async (filter: any, pagination: any) => {
    const { skip, limit } = pagination;

    const pipeline: any[] = [
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

    return await WorkModel.aggregate(pipeline);
  },

  search: async (search: string, pagination: any) => {
    const { skip, limit } = pagination;

    const pipeline: any[] = [
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

    return await WorkModel.aggregate(pipeline);
  },

findByWorkId: async (workId: string) => {
  return WorkModel.findOne({ workId: workId }).lean();
},

updateByWorkId: async (workId: string, payload: any) => {
  return WorkModel.findOneAndUpdate({ workId: workId }, payload, { new: true }).lean();
},

deleteByWorkId: async (workId: string) => {
  return WorkModel.findOneAndDelete({ workId: workId });
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
