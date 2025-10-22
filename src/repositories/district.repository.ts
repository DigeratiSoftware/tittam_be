import { District, IDistrict } from "../models/district.model";

export const districtRepository = {
  async create(district: Partial<IDistrict>) {
    return District.create(district);
  },
  async updateByDistrictId(districtId: string, update: Partial<IDistrict>) {
    return District.findOneAndUpdate({ districtId }, update, { new: true });
  },
  async findByDistrictId(districtId: string) {
    return District.findOne({ districtId });
  },
  async getAll() {
    return District.find();
  },
  async getByZoneId(zoneId: string) {
    return District.find({ zoneId });
  },
  async deleteByDistrictId(districtId: string) {
    return District.findOneAndDelete({ districtId });
  },
};
