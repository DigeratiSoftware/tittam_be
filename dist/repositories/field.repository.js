"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRepository = void 0;
// repositories/field.repository.ts
const field_model_1 = require("../models/field.model");
exports.FieldRepository = {
    create: (field) => field_model_1.Field.create(field),
    findById: (id) => field_model_1.Field.findById(id),
    findByComponentId: (componentId) => field_model_1.Field.find({ componentId }),
    findDefaultAndComponentFields: async (componentId, category) => {
        // Always fetch default fields
        const defaultFieldsPromise = field_model_1.Field.find({ type: "default", category }).sort({ order: 1 });
        // Fetch component-specific fields only if componentId is provided
        const componentFieldsPromise = componentId
            ? field_model_1.Field.find({ componentId }).sort({ order: 1 })
            : Promise.resolve([]); // return empty array if no componentId
        // Wait for both queries
        const [defaultFields, componentFields] = await Promise.all([defaultFieldsPromise, componentFieldsPromise]);
        // Combine them
        return [...defaultFields, ...componentFields];
    },
    updateById: (id, data) => field_model_1.Field.findByIdAndUpdate(id, data, { new: true }),
    deleteById: (id) => field_model_1.Field.findByIdAndDelete(id),
    findByNumberType: async () => {
        // Fetch fields where dataType is 'number', 'decimal', or 'float'
        return field_model_1.Field.find({
            dataType: { $in: ["number", "decimal", "float"] },
        }).sort({ order: 1 }).select({ _id: 0, fieldId: 1, name: 1 });
    },
    async count() {
        return field_model_1.Field.countDocuments();
    },
};
