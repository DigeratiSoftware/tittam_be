"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wardRepository = void 0;
const ward_model_1 = require("../models/ward.model");
exports.wardRepository = {
    create: (ward) => ward_model_1.Ward.create(ward),
    findAll: () => ward_model_1.Ward.find().sort({ createdAt: -1 }),
    findById: (wardId) => ward_model_1.Ward.findOne({ wardId }),
    findByTownPanchayat: (townPanchayatId) => ward_model_1.Ward.find({ townPanchayatId }).sort({ createdAt: -1 }),
    updateById: (wardId, data) => ward_model_1.Ward.findOneAndUpdate({ wardId }, data, { new: true }),
    deleteById: (wardId) => ward_model_1.Ward.findOneAndDelete({ wardId }),
};
