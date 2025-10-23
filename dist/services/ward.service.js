"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardService = void 0;
const ward_repository_1 = require("../repositories/ward.repository");
const http_error_1 = require("../utils/http-error");
exports.WardService = {
    async createWard(request, createdBy) {
        const newWard = {
            ...request,
            createdBy,
            updatedBy: createdBy,
        };
        return ward_repository_1.wardRepository.create(newWard);
    },
    async updateWard(id, request, updatedBy) {
        const updatedWard = {
            ...request,
            updatedBy,
        };
        const result = await ward_repository_1.wardRepository.updateById(id, updatedWard);
        if (!result)
            throw new http_error_1.HttpError(404, "Ward not found");
        return result;
    },
    async getWardsByTownPanchayat(townPanchayatId) {
        return ward_repository_1.wardRepository.findByTownPanchayat(townPanchayatId);
    },
    async getWardById(id) {
        const ward = await ward_repository_1.wardRepository.findById(id);
        if (!ward)
            throw new http_error_1.HttpError(404, "Ward not found");
        return ward;
    },
    async deleteWard(id) {
        const deleted = await ward_repository_1.wardRepository.deleteById(id);
        if (!deleted)
            throw new http_error_1.HttpError(404, "Ward not found");
    },
};
