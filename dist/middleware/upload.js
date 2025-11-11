"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage_service_1 = require("../services/storage.service");
const upload = (0, multer_1.default)({ storage: storage_service_1.multerStorage });
// ✅ Middleware to handle both single & multiple uploads gracefully
const handleUpload = (req, res, next) => {
    // Handle both field names: 'file' (single) or 'files' (multiple)
    const uploadHandler = upload.fields([
        { name: "file", maxCount: 1 },
        { name: "files", maxCount: 10 },
    ]);
    uploadHandler(req, res, (err) => {
        if (err) {
            console.error("Upload middleware error:", err);
            return res.status(400).json({ message: "File upload error", error: err.message });
        }
        // Normalize to req.files array for controller
        if (req.files) {
            const allFiles = Array.isArray(req.files)
                ? req.files
                : Object.values(req.files).flat();
            // If you want req.file also to exist for single uploads
            if (allFiles.length === 1) {
                req.file = allFiles[0];
            }
            req.files = allFiles;
        }
        next();
    });
};
exports.handleUpload = handleUpload;
