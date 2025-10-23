"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentRepository = void 0;
const component_model_1 = require("../models/component.model");
exports.componentRepository = {
    async create(data) {
        return component_model_1.Component.create(data);
    },
    async findAll() {
        return component_model_1.Component.find();
    },
    async findById(componentId) {
        return component_model_1.Component.findOne({ componentId });
    },
    async findOne(filter) {
        return component_model_1.Component.findOne(filter);
    },
    async updateByComponentId(componentId, update) {
        return component_model_1.Component.findOneAndUpdate({ componentId }, update, { new: true });
    },
    async deleteByComponentId(componentId) {
        await component_model_1.Component.findOneAndDelete({ componentId });
    }
};
