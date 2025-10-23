"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.districtRepository = void 0;
const district_model_1 = require("../models/district.model");
exports.districtRepository = {
    async create(district) {
        return district_model_1.District.create(district);
    },
    async updateByDistrictId(districtId, update) {
        return district_model_1.District.findOneAndUpdate({ districtId }, update, { new: true });
    },
    async findByDistrictId(districtId) {
        return district_model_1.District.findOne({ districtId });
    },
    async getAll() {
        return district_model_1.District.find();
    },
    async getByZoneId(zoneId) {
        return district_model_1.District.find({ zoneId });
    },
    async deleteByDistrictId(districtId) {
        return district_model_1.District.findOneAndDelete({ districtId });
    },
};
