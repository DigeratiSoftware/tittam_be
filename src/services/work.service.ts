import { workRepository } from "../repositories/work.repository";

export const workService = {
  createWork: async (data: any, userId: string) => {
    data.createdBy = userId;
    return await workRepository.create(data);
  },

getAllWorks: async (query: any) => {
  const { page = 1, limit = 50, search = "" } = query;

  const skip = (page - 1) * limit;

  if (search) {
    return await workRepository.search(search, { skip, limit });
  }

  return await workRepository.findAll({}, { skip, limit });
},

  getWorkById: async (id: string) => {
    return await workRepository.findByWorkId(id);
  },

  updateWork: async (id: string, data: any, userId: string) => {
    data.updatedBy = userId;
    return await workRepository.updateByWorkId(id, data);
  },

  deleteWork: async (id: string) => {
    return await workRepository.deleteByWorkId(id);
  },
};
