import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { multerStorage } from "../services/storage.service";

const upload = multer({ storage: multerStorage });

// ✅ Middleware to handle both single & multiple uploads gracefully
export const handleUpload = (req: Request, res: Response, next: NextFunction) => {
  // Handle both field names: 'file' (single) or 'files' (multiple)
  const uploadHandler = upload.fields([
    { name: "file", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ]);

  uploadHandler(req, res, (err: any) => {
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
        (req as any).file = allFiles[0];
      }

      (req as any).files = allFiles;
    }

    next();
  });
};
