import { Request, Response, NextFunction } from "express";
import { componentService } from "../services/component.service";
import { AuthRequest } from "../middleware/auth";
import { CreateComponentRequest } from "../models/component.model";

// ---------------- GET ALL ----------------
export const getAllComponents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const components = await componentService.getAllComponents();
    res.json(components);
  } catch (err) {
    next(err);
  }
};

// ---------------- GET BY ID ----------------
export const getComponentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const component = await componentService.getComponentById(id);
    res.json(component);
  } catch (err) {
    next(err);
  }
};

// ---------------- CREATE ----------------
export const createComponent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = req.body as CreateComponentRequest;
    const createdBy = req.userEmail || "system";
    const component = await componentService.createComponent(data, createdBy);
    res.status(201).json(component);
  } catch (err) {
    next(err);
  }
};

// ---------------- UPDATE ----------------
export const updateComponent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body as Partial<CreateComponentRequest>;
    const updatedBy = req.userEmail || "system";
    const component = await componentService.updateComponent(id, data, updatedBy);
    res.json(component);
  } catch (err) {
    next(err);
  }
};

// ---------------- ACTIVATE / DEACTIVATE ----------------
export const setComponentStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "ACTIVE" or "INACTIVE"
    const updatedBy = req.userEmail || "system";
    const component = await componentService.setStatus(id, status, updatedBy);
    res.json(component);
  } catch (err) {
    next(err);
  }
};

// ---------------- DELETE ----------------
export const deleteComponent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await componentService.deleteComponent(id);
    res.json({ message: "Component deleted" });
  } catch (err) {
    next(err);
  }
};

// ---------------- UPDATE FIELDS COUNT ----------------
export const updateFieldsCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { count } = req.body;
    await componentService.updateFieldsCount(id, count);
    res.json({ message: "Fields count updated" });
  } catch (err) {
    next(err);
  }
};
