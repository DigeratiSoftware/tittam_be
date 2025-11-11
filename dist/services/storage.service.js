"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = exports.s3 = exports.multerStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config");
// Local Storage Setup
const localStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const label = (req.body.label || "unlabeled").trim();
        const uploadPath = path_1.default.join(config_1.config.uploadPath, label);
        if (!fs_1.default.existsSync(uploadPath))
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
exports.multerStorage = config_1.config.uploadProvider === "aws" ? multer_1.default.memoryStorage() : localStorage;
// AWS S3 Upload
exports.s3 = new aws_sdk_1.default.S3({
    region: config_1.config.aws.region,
});
const uploadToS3 = async (file, label) => {
    const params = {
        Bucket: config_1.config.aws.bucket,
        Key: `${label}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    const data = await exports.s3.upload(params).promise();
    return data.Location; // S3 file URL
};
exports.uploadToS3 = uploadToS3;
