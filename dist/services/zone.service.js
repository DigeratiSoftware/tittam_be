"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneService = void 0;
const zone_repository_1 = require("../repositories/zone.repository");
const http_error_1 = require("../utils/http-error");
exports.zoneService = {
    async getAllZones() {
        return zone_repository_1.zoneRepository.findAll();
    },
    async getZoneById(zoneId) {
        const zone = await zone_repository_1.zoneRepository.findById(zoneId);
        if (!zone)
            throw new http_error_1.HttpError(404, "Zone not found");
        return zone;
    },
    async createZone(request, createdBy) {
        const newZone = {
            ...request,
            createdBy,
            updatedBy: createdBy,
        };
        return zone_repository_1.zoneRepository.create(newZone);
    },
    async updateZone(zoneId, request, updatedBy) {
        const updatedZone = await zone_repository_1.zoneRepository.updateById(zoneId, { ...request, updatedBy });
        if (!updatedZone)
            throw new http_error_1.HttpError(404, "Zone not found");
        return updatedZone;
    },
    async deleteZone(zoneId) {
        const deleted = await zone_repository_1.zoneRepository.deleteById(zoneId);
        if (!deleted)
            throw new http_error_1.HttpError(404, "Zone not found");
    },
};
