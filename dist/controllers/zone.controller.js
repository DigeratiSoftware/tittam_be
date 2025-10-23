"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneController = void 0;
const zone_service_1 = require("../services/zone.service");
exports.zoneController = {
    getAllZones: async (req, res, next) => {
        try {
            const zones = await zone_service_1.zoneService.getAllZones();
            res.json(zones);
        }
        catch (err) {
            next(err);
        }
    },
    getZoneById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const zone = await zone_service_1.zoneService.getZoneById(id);
            res.json(zone);
        }
        catch (err) {
            next(err);
        }
    },
    createZone: async (req, res, next) => {
        try {
            const body = req.body;
            const createdBy = req.userEmail || "system";
            const zone = await zone_service_1.zoneService.createZone(body, createdBy);
            res.status(201).json(zone);
        }
        catch (err) {
            next(err);
        }
    },
    updateZone: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const updatedBy = req.userEmail || "system";
            const zone = await zone_service_1.zoneService.updateZone(id, body, updatedBy);
            res.json(zone);
        }
        catch (err) {
            next(err);
        }
    },
    deleteZone: async (req, res, next) => {
        try {
            const { id } = req.params;
            await zone_service_1.zoneService.deleteZone(id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },
};
