"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workController = void 0;
const work_service_1 = require("../services/work.service");
exports.workController = {
    create: async (req, res) => {
        try {
            const userId = req.userEmail ?? "System"; // from token middleware
            const work = await work_service_1.workService.createWork(req.body, userId);
            res.status(201).json("Work created successfully");
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await work_service_1.workService.getAllWorks(req.query);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const work = await work_service_1.workService.getWorkById(req.params.id);
            if (!work)
                return res.status(404).json({ message: "Work not found" });
            res.json(work);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.userEmail ?? "System"; // from token middleware
            const updated = await work_service_1.workService.updateWork(req.params.id, req.body, userId);
            res.json("Work updated successfully");
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            await work_service_1.workService.deleteWork(req.params.id);
            res.json({ message: "Work deleted" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};
