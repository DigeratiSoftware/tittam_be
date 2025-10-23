"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemeRepository = void 0;
const scheme_model_1 = require("../models/scheme.model");
exports.schemeRepository = {
    // ---------------- CREATE ----------------
    async create(data) {
        return scheme_model_1.Scheme.create(data);
    },
    // ---------------- FIND ALL ----------------
    async findAll() {
        return scheme_model_1.Scheme.find();
    },
    // ---------------- FIND BY schemeId ----------------
    async findById(schemeId) {
        return scheme_model_1.Scheme.findOne({ schemeId });
    },
    // ---------------- FIND ONE ----------------
    async findOne(filter) {
        return scheme_model_1.Scheme.findOne(filter);
    },
    // ---------------- UPDATE ----------------
    async updateBySchemeId(schemeId, update) {
        return scheme_model_1.Scheme.findOneAndUpdate({ schemeId }, update, { new: true });
    },
    // ---------------- DELETE ----------------
    async deleteBySchemeId(schemeId) {
        await scheme_model_1.Scheme.findOneAndDelete({ schemeId });
    }
};
