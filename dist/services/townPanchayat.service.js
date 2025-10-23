"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TownPanchayatService = void 0;
const townPanchayat_repository_1 = require("../repositories/townPanchayat.repository");
const http_error_1 = require("../utils/http-error");
exports.TownPanchayatService = {
    async createTownPanchayat(request, createdBy) {
        const newTown = {
            ...request,
            createdBy,
            updatedBy: createdBy,
        };
        return townPanchayat_repository_1.townPanchayatRepository.create(newTown);
    },
    async updateTownPanchayat(id, request, updatedBy) {
        const updatedTown = {
            ...request,
            updatedBy,
        };
        const result = await townPanchayat_repository_1.townPanchayatRepository.updateById(id, updatedTown);
        if (!result)
            throw new http_error_1.HttpError(404, "Town Panchayat not found");
        return result;
    },
    async getTownPanchayatsByDistrict(districtId) {
        return townPanchayat_repository_1.townPanchayatRepository.findByDistrict(districtId);
    },
    async getTownPanchayatById(id) {
        const town = await townPanchayat_repository_1.townPanchayatRepository.findById(id);
        if (!town)
            throw new http_error_1.HttpError(404, "Town Panchayat not found");
        return town;
    },
    async deleteTownPanchayat(id) {
        const deleted = await townPanchayat_repository_1.townPanchayatRepository.deleteById(id);
        if (!deleted)
            throw new http_error_1.HttpError(404, "Town Panchayat not found");
    },
};
