"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictService = void 0;
const district_repository_1 = require("../repositories/district.repository");
const http_error_1 = require("../utils/http-error");
class DistrictService {
    static async getAllDistricts() {
        return district_repository_1.districtRepository.getAll();
    }
    static async getDistrictById(districtId) {
        const district = await district_repository_1.districtRepository.findByDistrictId(districtId);
        if (!district)
            throw new http_error_1.HttpError(404, "District not found");
        return district;
    }
    static async getDistrictsByZone(zoneId) {
        return district_repository_1.districtRepository.getByZoneId(zoneId);
    }
    static async createDistrict(request, createdBy) {
        const newDistrict = {
            ...request,
            createdBy,
            updatedBy: createdBy,
        };
        return district_repository_1.districtRepository.create(newDistrict);
    }
    static async updateDistrict(districtId, request, updatedBy) {
        const updated = await district_repository_1.districtRepository.updateByDistrictId(districtId, {
            ...request,
            updatedBy,
        });
        if (!updated)
            throw new http_error_1.HttpError(404, "District not found");
        return updated;
    }
    static async deleteDistrict(districtId) {
        const deleted = await district_repository_1.districtRepository.deleteByDistrictId(districtId);
        if (!deleted)
            throw new http_error_1.HttpError(404, "District not found");
        return deleted;
    }
}
exports.DistrictService = DistrictService;
