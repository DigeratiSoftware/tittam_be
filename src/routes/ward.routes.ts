import { Router } from "express";
import { WardController } from "../controllers/ward.controller";
import { authGuard } from "../middleware/auth";

export const wardRouter = Router();

wardRouter.get("/townPanchayat/:townPanchayatId", authGuard, WardController.getAllByTownPanchayat);
wardRouter.get("/:id", authGuard, WardController.getWardById);
wardRouter.post("/", authGuard, WardController.createWard);
wardRouter.put("/:id", authGuard, WardController.updateWard);
wardRouter.delete("/:id", authGuard, WardController.deleteWard);
