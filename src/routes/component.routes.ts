import { Router } from "express";
import * as Component from "../controllers/component.controller";
import { authGuard, requireAdminOrSelfForParam } from "../middleware/auth";

export const componentRouter = Router();

// Public / protected routes
componentRouter.get("/", authGuard, Component.getAllComponents);
componentRouter.get("/:id", authGuard, Component.getComponentById);
componentRouter.post("/", authGuard, Component.createComponent);
componentRouter.put("/:id", authGuard, Component.updateComponent);
componentRouter.delete("/:id", authGuard, Component.deleteComponent);

componentRouter.patch("/:id/status", authGuard, Component.setComponentStatus);
componentRouter.patch("/:id/fields-count", authGuard, Component.updateFieldsCount);
