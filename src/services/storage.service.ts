import multer from "multer";
import path from "path";
import fs from "fs";
import AWS from "aws-sdk";
import { config } from "../config";

// Local Storage Setup
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const label = (req.body.label || "unlabeled").trim();
    const uploadPath = path.join(config.uploadPath, label);

    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const multerStorage = config.uploadProvider === "aws" ? multer.memoryStorage() : localStorage;

// AWS S3 Upload
export const s3 = new AWS.S3({
  region: config.aws.region,
});

export const uploadToS3 = async (file: Express.Multer.File, label: string): Promise<string> => {
  const params = {
    Bucket: config.aws.bucket,
    Key: `${label}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const data = await s3.upload(params).promise();
  return data.Location; // S3 file URL
};
