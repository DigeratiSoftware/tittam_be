export const config = {
  uploadProvider: process.env.UPLOAD_PROVIDER || "local", // "local" | "aws"
  uploadPath: "uploads", // local upload directory
  aws: {
    bucket: process.env.AWS_BUCKET_NAME || "",
    region: process.env.AWS_REGION || "",
  },
};
