"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldService = exports.FieldService = void 0;
// services/field.service.ts
const field_repository_1 = require("../repositories/field.repository");
const component_repository_1 = require("../repositories/component.repository");
class FieldService {
    // Create a new field
    async createField(fieldData) {
        // ✅ Validate component
        const component = await component_repository_1.componentRepository.findById(fieldData.componentId);
        if (!component) {
            throw new Error("Component not found");
        }
        // ✅ Count existing fields to generate fieldId
        const count = await field_repository_1.FieldRepository.count();
        const fieldId = `FLD${(count + 1).toString().padStart(3, "0")}`;
        // ✅ Assign additional defaults
        fieldData.fieldId = fieldId;
        fieldData.category = component.componentTypeEnglish;
        fieldData.isSubForm = false;
        fieldData.createdAt = new Date();
        fieldData.type = "component";
        // ✅ Save via repository
        return field_repository_1.FieldRepository.create(fieldData);
    }
    // Get fields for a component, including default fields for the category
    async getFieldsByComponentId(componentId) {
        // 1️⃣ Fetch component to get its category/type
        const component = await component_repository_1.componentRepository.findById(componentId);
        if (!component) {
            throw new Error("Component not found");
        }
        const category = component.componentTypeEnglish; // e.g., "infrastructure" or "individual"
        // 2️⃣ Fetch default + component-specific fields
        console.log(componentId, category);
        const fields = await field_repository_1.FieldRepository.findDefaultAndComponentFields(componentId, category);
        return fields;
    }
    async updateField(id, data) {
        return field_repository_1.FieldRepository.updateById(id, data);
    }
    async deleteField(id) {
        return field_repository_1.FieldRepository.deleteById(id);
    }
    async getNumberFields() {
        return field_repository_1.FieldRepository.findByNumberType();
    }
}
exports.FieldService = FieldService;
exports.fieldService = new FieldService();
