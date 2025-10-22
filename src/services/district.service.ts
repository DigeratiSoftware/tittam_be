import { districtRepository } from "../repositories/district.repository";
import { CreateDistrictRequest, IDistrict } from "../models/district.model";
import { HttpError } from "../utils/http-error";

export class DistrictService {
  static async getAllDistricts(): Promise<IDistrict[]> {
    return districtRepository.getAll();
  }

  static async getDistrictById(districtId: string): Promise<IDistrict | null> {
    const district = await districtRepository.findByDistrictId(districtId);
    if (!district) throw new HttpError(404, "District not found");
    return district;
  }

  static async getDistrictsByZone(zoneId: string): Promise<IDistrict[]> {
    return districtRepository.getByZoneId(zoneId);
  }

  static async createDistrict(
    request: CreateDistrictRequest,
    createdBy: string
  ): Promise<IDistrict> {
    const newDistrict: Partial<IDistrict> = {
      ...request,
      createdBy,
      updatedBy: createdBy,
    };
    return districtRepository.create(newDistrict);
  }

  static async updateDistrict(
    districtId: string,
    request: Partial<CreateDistrictRequest>,
    updatedBy: string
  ): Promise<IDistrict> {
    const updated = await districtRepository.updateByDistrictId(districtId, {
      ...request,
      updatedBy,
    });
    if (!updated) throw new HttpError(404, "District not found");
    return updated;
  }

  static async deleteDistrict(districtId: string) {
    const deleted = await districtRepository.deleteByDistrictId(districtId);
    if (!deleted) throw new HttpError(404, "District not found");
    return deleted;
  }
}
