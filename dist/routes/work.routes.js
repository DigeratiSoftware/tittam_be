"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const work_controller_1 = require("../controllers/work.controller");
const auth_1 = require("../middleware/auth");
const workRouter = (0, express_1.Router)();
// CRUD
workRouter.post("/", auth_1.authGuard, work_controller_1.workController.create);
workRouter.get("/", auth_1.authGuard, work_controller_1.workController.getAll);
// workRouter.get("/search", workController.search);
// workRouter.get("/stats", workController.stats);
workRouter.get("/:id", auth_1.authGuard, work_controller_1.workController.getById);
workRouter.put("/:id", auth_1.authGuard, work_controller_1.workController.update);
// workRouter.patch("/:id/status", workController.updateStatus);
workRouter.delete("/:id", auth_1.authGuard, work_controller_1.workController.delete);
// bulk deletes and filters
// workRouter.get("/scheme/:schemeId", workController.getByScheme);
// workRouter.get("/component/:componentId", workController.getByComponent);
// workRouter.delete("/scheme/:schemeId", workController.deleteByScheme);
// workRouter.delete("/component/:componentId", workController.deleteByComponent);
exports.default = workRouter;
