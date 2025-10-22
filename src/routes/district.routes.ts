import { Router } from "express";
import { authGuard } from "../middleware/auth";
import {
  getAllDistricts,
  getDistrictById,
  getDistrictsByZone,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../controllers/district.controller";

const districtRouter = Router();

districtRouter.get("/", authGuard, getAllDistricts);
districtRouter.get("/:id", authGuard, getDistrictById);
districtRouter.get("/zone/:zoneId", authGuard, getDistrictsByZone);
districtRouter.post("/", authGuard, createDistrict);
districtRouter.put("/:id", authGuard, updateDistrict);
districtRouter.delete("/:id", authGuard, deleteDistrict);

export { districtRouter };
