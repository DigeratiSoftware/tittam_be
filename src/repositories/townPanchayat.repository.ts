import { TownPanchayat, ITownPanchayat } from "../models/townPanchayat.model";

export const townPanchayatRepository = {
  create: (tp: Partial<ITownPanchayat>) => TownPanchayat.create(tp),
  findAll: () => TownPanchayat.find().sort({ createdAt: -1 }),
  findById: (tpId: string) => TownPanchayat.findOne({ tpId }),
  findByDistrict: (districtId: string) => TownPanchayat.find({ districtId }).sort({ createdAt: -1 }),
  updateById: (tpId: string, data: Partial<ITownPanchayat>) =>
    TownPanchayat.findOneAndUpdate({ tpId }, data, { new: true }),
  deleteById: (tpId: string) => TownPanchayat.findOneAndDelete({ tpId }),
};
