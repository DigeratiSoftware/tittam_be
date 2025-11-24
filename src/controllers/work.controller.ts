import { Request, Response } from "express";
import { workService } from "../services/work.service";
import { AuthRequest } from "../middleware/auth";


export const workController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userEmail??"System"; // from token middleware
      const work = await workService.createWork(req.body, userId);
      res.status(201).json("Work created successfully");
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const result = await workService.getAllWorks(req.query);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const work = await workService.getWorkById(req.params.id);
      if (!work) return res.status(404).json({ message: "Work not found" });
      res.json(work);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const userId = req.userEmail??"System"; // from token middleware
      const updated = await workService.updateWork(
        req.params.id,
        req.body,
        userId
      );
      res.json("Work updated successfully");
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await workService.deleteWork(req.params.id);
      res.json({ message: "Work deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
