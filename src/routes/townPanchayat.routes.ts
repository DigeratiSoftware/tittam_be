import { Router } from "express";
import { TownPanchayatController } from "../controllers/townPanchayat.controller";
import { authGuard } from "../middleware/auth";

export const townPanchayatRouter = Router();

townPanchayatRouter.get("/district/:districtId", authGuard, TownPanchayatController.getAllByDistrict);
townPanchayatRouter.get("/:id", authGuard, TownPanchayatController.getTownPanchayatById);
townPanchayatRouter.post("/", authGuard, TownPanchayatController.createTownPanchayat);
townPanchayatRouter.put("/:id", authGuard, TownPanchayatController.updateTownPanchayat);
townPanchayatRouter.delete("/:id", authGuard, TownPanchayatController.deleteTownPanchayat);
