import { wardRepository } from "../repositories/ward.repository";
import { IWard, CreateWardRequest } from "../models/ward.model";
import { HttpError } from "../utils/http-error";

export const WardService = {
  async createWard(request: CreateWardRequest, createdBy: string): Promise<IWard> {
    const newWard: Partial<IWard> = {
      ...request,
      createdBy,
      updatedBy: createdBy,
    };
    return wardRepository.create(newWard);
  },

  async updateWard(
    id: string,
    request: Partial<CreateWardRequest>,
    updatedBy: string
  ): Promise<IWard> {
    const updatedWard: Partial<IWard> = {
      ...request,
      updatedBy,
    };
    const result = await wardRepository.updateById(id, updatedWard);
    if (!result) throw new HttpError(404, "Ward not found");
    return result;
  },

  async getWardsByTownPanchayat(townPanchayatId: string): Promise<IWard[]> {
    return wardRepository.findByTownPanchayat(townPanchayatId);
  },

  async getWardById(id: string): Promise<IWard> {
    const ward = await wardRepository.findById(id);
    if (!ward) throw new HttpError(404, "Ward not found");
    return ward;
  },

  async deleteWard(id: string): Promise<void> {
    const deleted = await wardRepository.deleteById(id);
    if (!deleted) throw new HttpError(404, "Ward not found");
  },
};
