"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardController = void 0;
const ward_service_1 = require("../services/ward.service");
exports.WardController = {
    getAllByTownPanchayat: async (req, res, next) => {
        try {
            const townPanchayatId = req.params.townPanchayatId;
            const wards = await ward_service_1.WardService.getWardsByTownPanchayat(townPanchayatId);
            res.json(wards);
        }
        catch (err) {
            next(err);
        }
    },
    getWardById: async (req, res, next) => {
        try {
            const ward = await ward_service_1.WardService.getWardById(req.params.id);
            res.json(ward);
        }
        catch (err) {
            next(err);
        }
    },
    createWard: async (req, res, next) => {
        try {
            const createdBy = req.userEmail || "system";
            const ward = await ward_service_1.WardService.createWard(req.body, createdBy);
            res.status(201).json(ward);
        }
        catch (err) {
            next(err);
        }
    },
    updateWard: async (req, res, next) => {
        try {
            const updatedBy = req.userEmail || "system";
            const ward = await ward_service_1.WardService.updateWard(req.params.id, req.body, updatedBy);
            res.json(ward);
        }
        catch (err) {
            next(err);
        }
    },
    deleteWard: async (req, res, next) => {
        try {
            await ward_service_1.WardService.deleteWard(req.params.id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },
};
