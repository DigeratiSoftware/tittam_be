import { Router } from "express";
import { workController } from "../controllers/work.controller";
import { authGuard } from "../middleware/auth";


const workRouter = Router();

// CRUD
workRouter.post("/", authGuard, workController.create);
workRouter.get("/", authGuard, workController.getAll);
// workRouter.get("/search", workController.search);
// workRouter.get("/stats", workController.stats);
workRouter.get("/:id", authGuard, workController.getById);
workRouter.put("/:id", authGuard, workController.update);
// workRouter.patch("/:id/status", workController.updateStatus);
workRouter.delete("/:id", authGuard, workController.delete);

// bulk deletes and filters
// workRouter.get("/scheme/:schemeId", workController.getByScheme);
// workRouter.get("/component/:componentId", workController.getByComponent);
// workRouter.delete("/scheme/:schemeId", workController.deleteByScheme);
// workRouter.delete("/component/:componentId", workController.deleteByComponent);

export default workRouter;