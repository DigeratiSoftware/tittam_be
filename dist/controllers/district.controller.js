"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDistrict = exports.updateDistrict = exports.createDistrict = exports.getDistrictsByZone = exports.getDistrictById = exports.getAllDistricts = void 0;
const district_service_1 = require("../services/district.service");
const getAllDistricts = async (req, res, next) => {
    try {
        const districts = await district_service_1.DistrictService.getAllDistricts();
        res.json(districts);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllDistricts = getAllDistricts;
const getDistrictById = async (req, res, next) => {
    try {
        const district = await district_service_1.DistrictService.getDistrictById(req.params.id);
        res.json(district);
    }
    catch (err) {
        next(err);
    }
};
exports.getDistrictById = getDistrictById;
const getDistrictsByZone = async (req, res, next) => {
    try {
        const districts = await district_service_1.DistrictService.getDistrictsByZone(req.params.zoneId);
        res.json(districts);
    }
    catch (err) {
        next(err);
    }
};
exports.getDistrictsByZone = getDistrictsByZone;
const createDistrict = async (req, res, next) => {
    try {
        const createdBy = req.userEmail || "system";
        const district = await district_service_1.DistrictService.createDistrict(req.body, createdBy);
        res.status(201).json(district);
    }
    catch (err) {
        next(err);
    }
};
exports.createDistrict = createDistrict;
const updateDistrict = async (req, res, next) => {
    try {
        const updatedBy = req.userEmail || "system";
        const district = await district_service_1.DistrictService.updateDistrict(req.params.id, req.body, updatedBy);
        res.json(district);
    }
    catch (err) {
        next(err);
    }
};
exports.updateDistrict = updateDistrict;
const deleteDistrict = async (req, res, next) => {
    try {
        await district_service_1.DistrictService.deleteDistrict(req.params.id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteDistrict = deleteDistrict;
