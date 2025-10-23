"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.townPanchayatRepository = void 0;
const townPanchayat_model_1 = require("../models/townPanchayat.model");
exports.townPanchayatRepository = {
    create: (tp) => townPanchayat_model_1.TownPanchayat.create(tp),
    findAll: () => townPanchayat_model_1.TownPanchayat.find().sort({ createdAt: -1 }),
    findById: (tpId) => townPanchayat_model_1.TownPanchayat.findOne({ tpId }),
    findByDistrict: (districtId) => townPanchayat_model_1.TownPanchayat.find({ districtId }).sort({ createdAt: -1 }),
    updateById: (tpId, data) => townPanchayat_model_1.TownPanchayat.findOneAndUpdate({ tpId }, data, { new: true }),
    deleteById: (tpId) => townPanchayat_model_1.TownPanchayat.findOneAndDelete({ tpId }),
};
