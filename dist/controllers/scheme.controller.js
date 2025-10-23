"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScheme = exports.updateScheme = exports.createScheme = exports.getSchemeById = exports.getAllSchemes = void 0;
const scheme_service_1 = require("../services/scheme.service");
const getAllSchemes = async (_req, res, next) => {
    try {
        const schemes = await scheme_service_1.schemeService.getAllSchemes();
        res.json(schemes);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllSchemes = getAllSchemes;
const getSchemeById = async (req, res, next) => {
    try {
        const scheme = await scheme_service_1.schemeService.getSchemeById(req.params.id);
        if (!scheme)
            return res.status(404).json({ message: "Scheme not found" });
        res.json(scheme);
    }
    catch (err) {
        next(err);
    }
};
exports.getSchemeById = getSchemeById;
const createScheme = async (req, res, next) => {
    try {
        const body = req.body;
        const createdByEmail = req.user?.email || "system"; // from JWT token
        const scheme = await scheme_service_1.schemeService.createScheme(body, createdByEmail);
        res.status(201).json(scheme);
    }
    catch (err) {
        next(err);
    }
};
exports.createScheme = createScheme;
const updateScheme = async (req, res, next) => {
    try {
        const body = req.body;
        const updatedByEmail = req.user?.email || "system"; // from JWT token
        const scheme = await scheme_service_1.schemeService.updateScheme(req.params.id, body, updatedByEmail);
        res.json(scheme);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.updateScheme = updateScheme;
const deleteScheme = async (req, res, next) => {
    try {
        await scheme_service_1.schemeService.deleteScheme(req.params.id);
        res.json({ message: "Scheme deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteScheme = deleteScheme;
