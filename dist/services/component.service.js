"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentService = void 0;
const component_repository_1 = require("../repositories/component.repository");
const component_model_1 = require("../models/component.model");
const http_error_1 = require("../utils/http-error");
exports.componentService = {
    async getAllComponents() {
        return component_repository_1.componentRepository.findAll();
    },
    async getComponentById(componentId) {
        const component = await component_repository_1.componentRepository.findById(componentId);
        if (!component)
            throw new http_error_1.HttpError(404, "Component not found");
        return component;
    },
    async createComponent(request, createdByEmail) {
        // 🔹 Normalize component name: lowercase, remove spaces, dots, hyphens
        const normalizedName = request.englishName
            .toLowerCase()
            .replace(/\s+/g, '') // remove all spaces
            .replace(/[.-]/g, ''); // remove dots and hyphens
        // 🔹 Check if a component with the same normalized name already exists
        const existing = await component_repository_1.componentRepository.findOne({ normalizedEnglishName: normalizedName });
        if (existing) {
            throw new http_error_1.HttpError(409, "Component name already exists");
        }
        // 🔹 Map component type to English & Tamil
        let componentTypeTamil = "";
        if (request.componentType === "Infrastructure") {
            componentTypeTamil = "கட்டமைப்பு";
        }
        else if (request.componentType === "Individual") {
            componentTypeTamil = "தனிநபர்";
        }
        // 🔹 Prepare new component
        const newComponent = {
            englishName: request.englishName,
            tamilName: request.tamilName,
            componentTypeEnglish: request.componentType, // map to English field
            componentTypeTamil: componentTypeTamil, // mapped Tamil field
            remark: request.remark,
            status: "ACTIVE",
            createdBy: createdByEmail,
            updatedBy: createdByEmail,
            normalizedEnglishName: normalizedName, // save normalized name for future queries
        };
        // 🔹 Create component
        return component_repository_1.componentRepository.create(newComponent);
    },
    async updateComponent(componentId, request, updatedByEmail) {
        // 🔹 Prepare updated component fields
        const updatedComponent = {
            ...request,
            updatedBy: updatedByEmail,
        };
        // 🔹 Map component type if provided
        if (request.componentType) {
            updatedComponent.componentTypeEnglish = request.componentType;
            if (request.componentType === "Infrastructure") {
                updatedComponent.componentTypeTamil = "கட்டமைப்பு";
            }
            else if (request.componentType === "Individual") {
                updatedComponent.componentTypeTamil = "தனிநபர்";
            }
            else {
                updatedComponent.componentTypeTamil = request.componentType; // fallback if new type is added
            }
        }
        // 🔹 Update in repository
        const result = await component_repository_1.componentRepository.updateByComponentId(componentId, updatedComponent);
        if (!result)
            throw new http_error_1.HttpError(404, "Component not found");
        return result;
    },
    async setStatus(componentId, status, updatedByEmail) {
        if (!component_model_1.COMPONENT_STATUS.includes(status))
            throw new http_error_1.HttpError(400, "Invalid status");
        const updated = await component_repository_1.componentRepository.updateByComponentId(componentId, { status, updatedBy: updatedByEmail });
        if (!updated)
            throw new http_error_1.HttpError(404, "Component not found");
        return updated;
    },
    async deleteComponent(componentId) {
        await component_repository_1.componentRepository.deleteByComponentId(componentId);
    },
    async updateFieldsCount(componentId, count) {
        const component = await component_repository_1.componentRepository.updateByComponentId(componentId, { fieldsCount: count });
        if (!component)
            throw new http_error_1.HttpError(404, "Component not found");
    }
};
