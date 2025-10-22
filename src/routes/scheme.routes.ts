import { Router } from "express";
import * as Scheme from "../controllers/scheme.controller";
import { authGuard } from "../middleware/auth";

export const schemeRouter = Router();

schemeRouter.get("/",authGuard, Scheme.getAllSchemes);
schemeRouter.get("/:id",authGuard, Scheme.getSchemeById);
schemeRouter.post("/", authGuard, Scheme.createScheme);
schemeRouter.put("/:id", authGuard, Scheme.updateScheme);
schemeRouter.delete("/:id", authGuard, Scheme.deleteScheme);


