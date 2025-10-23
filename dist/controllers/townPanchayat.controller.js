"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TownPanchayatController = void 0;
const townPanchayat_service_1 = require("../services/townPanchayat.service");
exports.TownPanchayatController = {
    getAllByDistrict: async (req, res, next) => {
        try {
            const districtId = req.params.districtId;
            const towns = await townPanchayat_service_1.TownPanchayatService.getTownPanchayatsByDistrict(districtId);
            res.json(towns);
        }
        catch (err) {
            next(err);
        }
    },
    getTownPanchayatById: async (req, res, next) => {
        try {
            const town = await townPanchayat_service_1.TownPanchayatService.getTownPanchayatById(req.params.id);
            res.json(town);
        }
        catch (err) {
            next(err);
        }
    },
    createTownPanchayat: async (req, res, next) => {
        try {
            const createdBy = req.userEmail || "system";
            const town = await townPanchayat_service_1.TownPanchayatService.createTownPanchayat(req.body, createdBy);
            res.status(201).json(town);
        }
        catch (err) {
            next(err);
        }
    },
    updateTownPanchayat: async (req, res, next) => {
        try {
            const updatedBy = req.userEmail || "system";
            const town = await townPanchayat_service_1.TownPanchayatService.updateTownPanchayat(req.params.id, req.body, updatedBy);
            res.json(town);
        }
        catch (err) {
            next(err);
        }
    },
    deleteTownPanchayat: async (req, res, next) => {
        try {
            await townPanchayat_service_1.TownPanchayatService.deleteTownPanchayat(req.params.id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },
};
