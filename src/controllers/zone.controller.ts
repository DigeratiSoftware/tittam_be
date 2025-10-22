import { Request, Response, NextFunction } from "express";
import { zoneService } from "../services/zone.service";
import { AuthRequest } from "../middleware/auth";


export const zoneController = {
  getAllZones: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const zones = await zoneService.getAllZones();
      res.json(zones);
    } catch (err) {
      next(err);
    }
  },

  getZoneById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const zone = await zoneService.getZoneById(id);
      res.json(zone);
    } catch (err) {
      next(err);
    }
  },

  createZone: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const createdBy = req.userEmail || "system";
      const zone = await zoneService.createZone(body, createdBy);
      res.status(201).json(zone);
    } catch (err) {
      next(err);
    }
  },

  updateZone: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedBy = req.userEmail || "system";
      const zone = await zoneService.updateZone(id, body, updatedBy);
      res.json(zone);
    } catch (err) {
      next(err);
    }
  },

  deleteZone: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await zoneService.deleteZone(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
