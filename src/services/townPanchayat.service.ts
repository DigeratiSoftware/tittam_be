import { townPanchayatRepository } from "../repositories/townPanchayat.repository";
import { ITownPanchayat, CreateTownPanchayatRequest } from "../models/townPanchayat.model";
import { HttpError } from "../utils/http-error";

export const TownPanchayatService = {
  async createTownPanchayat(
    request: CreateTownPanchayatRequest,
    createdBy: string
  ): Promise<ITownPanchayat> {
    const newTown: Partial<ITownPanchayat> = {
      ...request,
      createdBy,
      updatedBy: createdBy,
    };
    return townPanchayatRepository.create(newTown);
  },

  async updateTownPanchayat(
    id: string,
    request: Partial<CreateTownPanchayatRequest>,
    updatedBy: string
  ): Promise<ITownPanchayat> {
    const updatedTown: Partial<ITownPanchayat> = {
      ...request,
      updatedBy,
    };
    const result = await townPanchayatRepository.updateById(id, updatedTown);
    if (!result) throw new HttpError(404, "Town Panchayat not found");
    return result;
  },

  async getTownPanchayatsByDistrict(districtId: string): Promise<ITownPanchayat[]> {
    return townPanchayatRepository.findByDistrict(districtId);
  },

  async getTownPanchayatById(id: string): Promise<ITownPanchayat> {
    const town = await townPanchayatRepository.findById(id);
    if (!town) throw new HttpError(404, "Town Panchayat not found");
    return town;
  },

  async deleteTownPanchayat(id: string): Promise<void> {
    const deleted = await townPanchayatRepository.deleteById(id);
    if (!deleted) throw new HttpError(404, "Town Panchayat not found");
  },
};
