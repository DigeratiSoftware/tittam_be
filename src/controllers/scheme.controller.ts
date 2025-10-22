import { Request, Response, NextFunction } from "express";
import { schemeService } from "../services/scheme.service";
import {CreateSchemeRequest} from "../models/scheme.model";

export const getAllSchemes = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const schemes = await schemeService.getAllSchemes();
    res.json(schemes);
  } catch (err) {
    next(err);
  }
};

export const getSchemeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheme = await schemeService.getSchemeById(req.params.id);
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });
    res.json(scheme);
  } catch (err) {
    next(err);
  }
};

export const createScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: CreateSchemeRequest = req.body;
    const createdByEmail = (req as any).user?.email || "system"; // from JWT token
    const scheme = await schemeService.createScheme(body, createdByEmail);
    res.status(201).json(scheme);
  } catch (err) {
    next(err);
  }
};

export const updateScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: CreateSchemeRequest = req.body;
    const updatedByEmail = (req as any).user?.email || "system"; // from JWT token
    const scheme = await schemeService.updateScheme(req.params.id, body, updatedByEmail);
    res.json(scheme);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schemeService.deleteScheme(req.params.id);
    res.json({ message: "Scheme deleted successfully" });
  } catch (err) {
    next(err);
  }
};
