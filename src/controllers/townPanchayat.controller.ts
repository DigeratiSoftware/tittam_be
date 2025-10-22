import { Request, Response, NextFunction } from "express";
import { TownPanchayatService } from "../services/townPanchayat.service";
import { AuthRequest } from "../middleware/auth";


export const TownPanchayatController = {
  getAllByDistrict: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const districtId = req.params.districtId;
      const towns = await TownPanchayatService.getTownPanchayatsByDistrict(districtId);
      res.json(towns);
    } catch (err) {
      next(err);
    }
  },

  getTownPanchayatById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const town = await TownPanchayatService.getTownPanchayatById(req.params.id);
      res.json(town);
    } catch (err) {
      next(err);
    }
  },

  createTownPanchayat: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
    const createdBy = req.userEmail || "system";
      const town = await TownPanchayatService.createTownPanchayat(req.body, createdBy);
      res.status(201).json(town);
    } catch (err) {
      next(err);
    }
  },

  updateTownPanchayat: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const updatedBy = req.userEmail || "system";
      const town = await TownPanchayatService.updateTownPanchayat(
        req.params.id,
        req.body,
        updatedBy
      );
      res.json(town);
    } catch (err) {
      next(err);
    }
  },

  deleteTownPanchayat: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TownPanchayatService.deleteTownPanchayat(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
