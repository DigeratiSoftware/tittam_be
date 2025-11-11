"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUploadedFiles = void 0;
const path_1 = __importDefault(require("path"));
const file_model_1 = require("../models/file.model");
const storage_service_1 = require("./storage.service");
const saveUploadedFiles = async (files, label, storage) => {
    const urls = [];
    for (const file of files) {
        let fileUrl = "";
        if (storage === "local") {
            fileUrl = `http://localhost:3000/${path_1.default.join(file.destination, file.filename)}`.replace(/\\/g, "/");
        }
        else {
            fileUrl = await (0, storage_service_1.uploadToS3)(file, label);
        }
        await file_model_1.FileModel.create({
            label,
            url: fileUrl,
            filename: file.originalname,
            storage,
        });
        urls.push(fileUrl);
    }
    return urls;
};
exports.saveUploadedFiles = saveUploadedFiles;
