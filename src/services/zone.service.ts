import { CreateZoneRequest, IZone } from "../models/zone.model";
import { zoneRepository } from "../repositories/zone.repository";
import { HttpError } from "../utils/http-error";

export const zoneService = {
  async getAllZones(): Promise<IZone[]> {
    return zoneRepository.findAll();
  },

  async getZoneById(zoneId: string): Promise<IZone> {
    const zone = await zoneRepository.findById(zoneId);
    if (!zone) throw new HttpError(404, "Zone not found");
    return zone;
  },

  async createZone(request: CreateZoneRequest, createdBy: string): Promise<IZone> {
    const newZone: Partial<IZone> = {
      ...request,
      createdBy,
      updatedBy: createdBy,
    };
    return zoneRepository.create(newZone);
  },

  async updateZone(zoneId: string, request: Partial<CreateZoneRequest>, updatedBy: string): Promise<IZone> {
    const updatedZone = await zoneRepository.updateById(zoneId, { ...request, updatedBy });
    if (!updatedZone) throw new HttpError(404, "Zone not found");
    return updatedZone;
  },

  async deleteZone(zoneId: string): Promise<void> {
    const deleted = await zoneRepository.deleteById(zoneId);
    if (!deleted) throw new HttpError(404, "Zone not found");
  },
};
