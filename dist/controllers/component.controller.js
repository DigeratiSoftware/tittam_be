"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFieldsCount = exports.deleteComponent = exports.setComponentStatus = exports.updateComponent = exports.createComponent = exports.getComponentById = exports.getAllComponents = void 0;
const component_service_1 = require("../services/component.service");
// ---------------- GET ALL ----------------
const getAllComponents = async (_req, res, next) => {
    try {
        const components = await component_service_1.componentService.getAllComponents();
        res.json(components);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllComponents = getAllComponents;
// ---------------- GET BY ID ----------------
const getComponentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const component = await component_service_1.componentService.getComponentById(id);
        res.json(component);
    }
    catch (err) {
        next(err);
    }
};
exports.getComponentById = getComponentById;
// ---------------- CREATE ----------------
const createComponent = async (req, res, next) => {
    try {
        const data = req.body;
        const createdBy = req.userEmail || "system";
        const component = await component_service_1.componentService.createComponent(data, createdBy);
        res.status(201).json(component);
    }
    catch (err) {
        next(err);
    }
};
exports.createComponent = createComponent;
// ---------------- UPDATE ----------------
const updateComponent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedBy = req.userEmail || "system";
        const component = await component_service_1.componentService.updateComponent(id, data, updatedBy);
        res.json(component);
    }
    catch (err) {
        next(err);
    }
};
exports.updateComponent = updateComponent;
// ---------------- ACTIVATE / DEACTIVATE ----------------
const setComponentStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // "ACTIVE" or "INACTIVE"
        const updatedBy = req.userEmail || "system";
        const component = await component_service_1.componentService.setStatus(id, status, updatedBy);
        res.json(component);
    }
    catch (err) {
        next(err);
    }
};
exports.setComponentStatus = setComponentStatus;
// ---------------- DELETE ----------------
const deleteComponent = async (req, res, next) => {
    try {
        const { id } = req.params;
        await component_service_1.componentService.deleteComponent(id);
        res.json({ message: "Component deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteComponent = deleteComponent;
// ---------------- UPDATE FIELDS COUNT ----------------
const updateFieldsCount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { count } = req.body;
        await component_service_1.componentService.updateFieldsCount(id, count);
        res.json({ message: "Fields count updated" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateFieldsCount = updateFieldsCount;
