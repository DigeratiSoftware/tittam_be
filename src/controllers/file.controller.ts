import { Request, Response } from "express";
import { config } from "./../config/index";
import { saveUploadedFiles } from "../services/file.service";



export const uploadFile = async (req: Request, res: Response) => {
  const label = (req.body.label || "unlabeled").trim();
  const storage: "local" | "aws" = config.uploadProvider as any;

  // ✅ Handle both single and multiple uploads
  let uploadedFiles: Express.Multer.File[] = [];

  if (req.file) {
    uploadedFiles = [req.file];
  } else if (req.files) {
    if (Array.isArray(req.files)) {
      uploadedFiles = req.files;
    } else {
      // when using fields()
      uploadedFiles = Object.values(req.files).flat();
    }
  }

  if (!uploadedFiles.length) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  try {
    const fileUrls = await saveUploadedFiles(uploadedFiles, label, storage);

    return res.status(200).json({
      message: "Files uploaded successfully",
      label,
      storage,
      urls: fileUrls.length === 1 ? fileUrls[0] : fileUrls,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
