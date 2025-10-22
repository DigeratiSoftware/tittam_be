import { Request, Response, NextFunction } from "express";
import { DistrictService } from "../services/district.service";
import { AuthRequest } from "../middleware/auth";


export const getAllDistricts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const districts = await DistrictService.getAllDistricts();
    res.json(districts);
  } catch (err) {
    next(err);
  }
};

export const getDistrictById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const district = await DistrictService.getDistrictById(req.params.id);
    res.json(district);
  } catch (err) {
    next(err);
  }
};

export const getDistrictsByZone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const districts = await DistrictService.getDistrictsByZone(req.params.zoneId);
    res.json(districts);
  } catch (err) {
    next(err);
  }
};

export const createDistrict = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const createdBy = req.userEmail || "system";
    const district = await DistrictService.createDistrict(req.body, createdBy);
    res.status(201).json(district);
  } catch (err) {
    next(err);
  }
};

export const updateDistrict = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const updatedBy = req.userEmail || "system";
    const district = await DistrictService.updateDistrict(req.params.id, req.body, updatedBy);
    res.json(district);
  } catch (err) {
    next(err);
  }
};

export const deleteDistrict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DistrictService.deleteDistrict(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
