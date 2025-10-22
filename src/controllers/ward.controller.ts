import { Request, Response, NextFunction } from "express";
import { WardService } from "../services/ward.service";
import { AuthRequest } from "../middleware/auth";


export const WardController = {
  getAllByTownPanchayat: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const townPanchayatId = req.params.townPanchayatId;
      const wards = await WardService.getWardsByTownPanchayat(townPanchayatId);
      res.json(wards);
    } catch (err) {
      next(err);
    }
  },

  getWardById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ward = await WardService.getWardById(req.params.id);
      res.json(ward);
    } catch (err) {
      next(err);
    }
  },

  createWard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
    const createdBy = req.userEmail || "system";
      const ward = await WardService.createWard(req.body, createdBy);
      res.status(201).json(ward);
    } catch (err) {
      next(err);
    }
  },

  updateWard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const updatedBy = req.userEmail || "system";
      const ward = await WardService.updateWard(req.params.id, req.body, updatedBy);
      res.json(ward);
    } catch (err) {
      next(err);
    }
  },

  deleteWard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await WardService.deleteWard(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
