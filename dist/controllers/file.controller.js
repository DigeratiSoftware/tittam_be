"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const index_1 = require("./../config/index");
const file_service_1 = require("../services/file.service");
const uploadFile = async (req, res) => {
    const label = (req.body.label || "unlabeled").trim();
    const storage = index_1.config.uploadProvider;
    // ✅ Handle both single and multiple uploads
    let uploadedFiles = [];
    if (req.file) {
        uploadedFiles = [req.file];
    }
    else if (req.files) {
        if (Array.isArray(req.files)) {
            uploadedFiles = req.files;
        }
        else {
            // when using fields()
            uploadedFiles = Object.values(req.files).flat();
        }
    }
    if (!uploadedFiles.length) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    try {
        const fileUrls = await (0, file_service_1.saveUploadedFiles)(uploadedFiles, label, storage);
        return res.status(200).json({
            message: "Files uploaded successfully",
            label,
            storage,
            urls: fileUrls.length === 1 ? fileUrls[0] : fileUrls,
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ message: "Upload failed", error: error.message });
    }
};
exports.uploadFile = uploadFile;
