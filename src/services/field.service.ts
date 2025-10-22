// services/field.service.ts
import { FieldRepository } from "../repositories/field.repository";
import { componentRepository } from "../repositories/component.repository";


export class FieldService {
  // Create a new field
 async createField(fieldData: any) {
    // ✅ Validate component
    const component = await componentRepository.findById(fieldData.componentId);
    if (!component) {
      throw new Error("Component not found");
    }

    // ✅ Count existing fields to generate fieldId
    const count = await FieldRepository.count();
    const fieldId = `FLD${(count + 1).toString().padStart(3, "0")}`;

    // ✅ Assign additional defaults
    fieldData.fieldId = fieldId;
    fieldData.category = component.componentTypeEnglish;
    fieldData.isSubForm = false;
    fieldData.createdAt = new Date();
    fieldData.type = "component";

    // ✅ Save via repository
    return FieldRepository.create(fieldData);
  }

  // Get fields for a component, including default fields for the category
  async getFieldsByComponentId(componentId: string) {
    // 1️⃣ Fetch component to get its category/type
    const component = await componentRepository.findById(componentId);
    if (!component) {
      throw new Error("Component not found");
    }

    const category = component.componentTypeEnglish; // e.g., "infrastructure" or "individual"

    // 2️⃣ Fetch default + component-specific fields
    console.log(componentId,category)
    const fields = await FieldRepository.findDefaultAndComponentFields(componentId, category);
    return fields;
  }

  async updateField(id: string, data: any) {
    return FieldRepository.updateById(id, data);
  }

  async deleteField(id: string) {
    return FieldRepository.deleteById(id);
  }

  async getNumberFields() {
    return FieldRepository.findByNumberType();
  }
}

export const fieldService = new FieldService();
