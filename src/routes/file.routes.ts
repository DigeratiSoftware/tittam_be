import express from "express";
import { uploadFile } from "../controllers/file.controller";
import { handleUpload } from "./../middleware/upload";

const router = express.Router();

router.post("/upload", handleUpload, uploadFile);

export default router;
