"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workService = void 0;
const work_repository_1 = require("../repositories/work.repository");
exports.workService = {
    createWork: async (data, userId) => {
        data.createdBy = userId;
        return await work_repository_1.workRepository.create(data);
    },
    getAllWorks: async (query) => {
        const { page = 1, limit = 50, search = "" } = query;
        const skip = (page - 1) * limit;
        if (search) {
            return await work_repository_1.workRepository.search(search, { skip, limit });
        }
        return await work_repository_1.workRepository.findAll({}, { skip, limit });
    },
    getWorkById: async (id) => {
        return await work_repository_1.workRepository.findByWorkId(id);
    },
    updateWork: async (id, data, userId) => {
        data.updatedBy = userId;
        return await work_repository_1.workRepository.updateByWorkId(id, data);
    },
    deleteWork: async (id) => {
        return await work_repository_1.workRepository.deleteByWorkId(id);
    },
};
