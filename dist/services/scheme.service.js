"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemeService = void 0;
const scheme_repository_1 = require("../repositories/scheme.repository");
const http_error_1 = require("../utils/http-error");
exports.schemeService = {
    // ---------------- GET ALL ----------------
    async getAllSchemes() {
        return scheme_repository_1.schemeRepository.findAll();
    },
    // ---------------- GET BY ID ----------------
    async getSchemeById(schemeId) {
        const scheme = await scheme_repository_1.schemeRepository.findById(schemeId);
        if (!scheme)
            throw new http_error_1.HttpError(404, "Scheme not found");
        return scheme;
    },
    // ---------------- CREATE ----------------
    async createScheme(request, createdByEmail) {
        // Normalize scheme name: lowercase, remove spaces, dots, and hyphens
        const normalizedName = request.englishName
            .toLowerCase()
            .replace(/\s+/g, '') // remove all spaces
            .replace(/[.-]/g, ''); // remove dots and hyphens
        // Check if a scheme with the same normalized name exists
        const existing = await scheme_repository_1.schemeRepository.findOne({ normalizedEnglishName: normalizedName });
        if (existing) {
            throw new http_error_1.HttpError(409, "Scheme name already exists");
        }
        // Prepare new scheme
        const newScheme = {
            ...request,
            status: "ACTIVE",
            createdBy: createdByEmail,
            updatedBy: createdByEmail,
            normalizedEnglishName: normalizedName, // save normalized name for future queries
        };
        // Create scheme
        return scheme_repository_1.schemeRepository.create(newScheme);
    },
    // ---------------- UPDATE ----------------
    async updateScheme(schemeId, request, updatedByEmail) {
        const updatedScheme = {
            ...request,
            updatedBy: updatedByEmail,
        };
        const result = await scheme_repository_1.schemeRepository.updateBySchemeId(schemeId, updatedScheme);
        if (!result)
            throw new http_error_1.HttpError(404, "Scheme not found");
        return result;
    },
    // ---------------- ACTIVATE / DEACTIVATE ----------------
    async setStatus(schemeId, status, updatedByEmail) {
        const updatedScheme = await scheme_repository_1.schemeRepository.updateBySchemeId(schemeId, { status, updatedBy: updatedByEmail });
        if (!updatedScheme)
            throw new http_error_1.HttpError(404, "Scheme not found");
        return updatedScheme;
    },
    // ---------------- DELETE ----------------
    async deleteScheme(schemeId) {
        await scheme_repository_1.schemeRepository.deleteBySchemeId(schemeId);
    },
};
