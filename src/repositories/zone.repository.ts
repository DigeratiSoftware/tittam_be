import { Zone, IZone } from "../models/zone.model";

export const zoneRepository = {
  create: (zone: Partial<IZone>) => Zone.create(zone),
  findAll: () => Zone.find().sort({ createdAt: -1 }),
  findById: (zoneId: string) => Zone.findOne({ zoneId }),
  updateById: (zoneId: string, data: Partial<IZone>) =>
    Zone.findOneAndUpdate({ zoneId }, data, { new: true }),
  deleteById: (zoneId: string) => Zone.findOneAndDelete({ zoneId }),
};
