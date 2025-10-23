"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneRepository = void 0;
const zone_model_1 = require("../models/zone.model");
exports.zoneRepository = {
    create: (zone) => zone_model_1.Zone.create(zone),
    findAll: () => zone_model_1.Zone.find().sort({ createdAt: -1 }),
    findById: (zoneId) => zone_model_1.Zone.findOne({ zoneId }),
    updateById: (zoneId, data) => zone_model_1.Zone.findOneAndUpdate({ zoneId }, data, { new: true }),
    deleteById: (zoneId) => zone_model_1.Zone.findOneAndDelete({ zoneId }),
};
