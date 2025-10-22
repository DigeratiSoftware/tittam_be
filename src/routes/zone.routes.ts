import { Router } from "express";
import { zoneController } from "../controllers/zone.controller";
import { authGuard } from "../middleware/auth";

const zoneRouter = Router();

zoneRouter.get("/", authGuard, zoneController.getAllZones);
zoneRouter.get("/:id", authGuard, zoneController.getZoneById);
zoneRouter.post("/", authGuard, zoneController.createZone);
zoneRouter.put("/:id", authGuard, zoneController.updateZone);
zoneRouter.delete("/:id", authGuard, zoneController.deleteZone);

export { zoneRouter };
