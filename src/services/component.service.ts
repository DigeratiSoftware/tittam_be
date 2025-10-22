import { componentRepository } from "../repositories/component.repository";
import { IComponent, CreateComponentRequest, COMPONENT_STATUS } from "../models/component.model";
import { HttpError } from "../utils/http-error";

export const componentService = {
  async getAllComponents(): Promise<IComponent[]> {
    return componentRepository.findAll();
  },

  async getComponentById(componentId: string): Promise<IComponent> {
    const component = await componentRepository.findById(componentId);
    if (!component) throw new HttpError(404, "Component not found");
    return component;
  },

async createComponent(request: CreateComponentRequest, createdByEmail: string): Promise<IComponent> {
  // 🔹 Normalize component name: lowercase, remove spaces, dots, hyphens
  const normalizedName = request.englishName
    .toLowerCase()
    .replace(/\s+/g, '')   // remove all spaces
    .replace(/[.-]/g, ''); // remove dots and hyphens

  // 🔹 Check if a component with the same normalized name already exists
  const existing = await componentRepository.findOne({ normalizedEnglishName: normalizedName });

  if (existing) {
    throw new HttpError(409, "Component name already exists");
  }

  // 🔹 Map component type to English & Tamil
  let componentTypeTamil = "";
  if (request.componentType === "Infrastructure") {
    componentTypeTamil = "கட்டமைப்பு";
  } else if (request.componentType === "Individual") {
    componentTypeTamil = "தனிநபர்";
  }

  // 🔹 Prepare new component
  const newComponent: Partial<IComponent> = {
    englishName: request.englishName,
    tamilName: request.tamilName,
    componentTypeEnglish: request.componentType,  // map to English field
    componentTypeTamil: componentTypeTamil,       // mapped Tamil field
    remark: request.remark,
    status: "ACTIVE",
    createdBy: createdByEmail,
    updatedBy: createdByEmail,
    normalizedEnglishName: normalizedName,        // save normalized name for future queries
  };

  // 🔹 Create component
  return componentRepository.create(newComponent);
},



async updateComponent(
  componentId: string,
  request: Partial<CreateComponentRequest>,
  updatedByEmail: string
): Promise<IComponent> {
  // 🔹 Prepare updated component fields
  const updatedComponent: Partial<IComponent> = {
    ...request,
    updatedBy: updatedByEmail,
  };

  // 🔹 Map component type if provided
  if (request.componentType) {
    updatedComponent.componentTypeEnglish = request.componentType;

    if (request.componentType === "Infrastructure") {
      updatedComponent.componentTypeTamil = "கட்டமைப்பு";
    } else if (request.componentType === "Individual") {
      updatedComponent.componentTypeTamil = "தனிநபர்";
    } else {
      updatedComponent.componentTypeTamil = request.componentType; // fallback if new type is added
    }
  }

  // 🔹 Update in repository
  const result = await componentRepository.updateByComponentId(
    componentId,
    updatedComponent
  );

  if (!result) throw new HttpError(404, "Component not found");
  return result;
},


  async setStatus(componentId: string, status: IComponent["status"], updatedByEmail: string): Promise<IComponent> {
    if (!COMPONENT_STATUS.includes(status)) throw new HttpError(400, "Invalid status");
    const updated = await componentRepository.updateByComponentId(componentId, { status, updatedBy: updatedByEmail });
    if (!updated) throw new HttpError(404, "Component not found");
    return updated;
  },

  async deleteComponent(componentId: string): Promise<void> {
    await componentRepository.deleteByComponentId(componentId);
  },

  async updateFieldsCount(componentId: string, count: number): Promise<void> {
    const component = await componentRepository.updateByComponentId(componentId, { fieldsCount: count });
    if (!component) throw new HttpError(404, "Component not found");
  }
};
