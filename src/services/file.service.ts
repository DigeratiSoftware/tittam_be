import path from "path";
import { config } from "../config";
import { FileModel } from "../models/file.model";
import { uploadToS3 } from "./storage.service";

export const saveUploadedFiles = async (
  files: Express.Multer.File[],
  label: string,
  storage: "local" | "aws"
) => {
  const urls: string[] = [];

  for (const file of files) {
    let fileUrl = "";

    if (storage === "local") {
      fileUrl = `http://localhost:3000/${path.join(file.destination, file.filename)}`.replace(/\\/g, "/");
    } else {
      fileUrl = await uploadToS3(file, label);
    }

    await FileModel.create({
      label,
      url: fileUrl,
      filename: file.originalname,
      storage,
    });

    urls.push(fileUrl);
  }

  return urls;
};
