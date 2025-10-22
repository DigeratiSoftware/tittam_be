import { Ward, IWard } from "../models/ward.model";

export const wardRepository = {
  create: (ward: Partial<IWard>) => Ward.create(ward),
  findAll: () => Ward.find().sort({ createdAt: -1 }),
  findById: (wardId: string) => Ward.findOne({ wardId }),
  findByTownPanchayat: (townPanchayatId: string) => Ward.find({ townPanchayatId }).sort({ createdAt: -1 }),
  updateById: (wardId: string, data: Partial<IWard>) =>
    Ward.findOneAndUpdate({ wardId }, data, { new: true }),
  deleteById: (wardId: string) => Ward.findOneAndDelete({ wardId }),
};
