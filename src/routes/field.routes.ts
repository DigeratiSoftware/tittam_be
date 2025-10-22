// routes/field.routes.ts
import { Router } from "express";
import { FieldController } from "../controllers/field.controller";


export const fieldRouter = Router();

fieldRouter.post("/", FieldController.createField);
fieldRouter.get("/", FieldController.getAllFields);
fieldRouter.get("/component/:componentId", FieldController.getFieldsByComponentId);
fieldRouter.put("/:id", FieldController.updateField);
fieldRouter.delete("/:id", FieldController.deleteField);
fieldRouter.get("/number-fields", FieldController.getNumberFields);


export default fieldRouter;
