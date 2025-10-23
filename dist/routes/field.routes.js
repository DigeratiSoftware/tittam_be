"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldRouter = void 0;
// routes/field.routes.ts
const express_1 = require("express");
const field_controller_1 = require("../controllers/field.controller");
exports.fieldRouter = (0, express_1.Router)();
exports.fieldRouter.post("/", field_controller_1.FieldController.createField);
exports.fieldRouter.get("/", field_controller_1.FieldController.getAllFields);
exports.fieldRouter.get("/component/:componentId", field_controller_1.FieldController.getFieldsByComponentId);
exports.fieldRouter.put("/:id", field_controller_1.FieldController.updateField);
exports.fieldRouter.delete("/:id", field_controller_1.FieldController.deleteField);
exports.fieldRouter.get("/number-fields", field_controller_1.FieldController.getNumberFields);
exports.default = exports.fieldRouter;
