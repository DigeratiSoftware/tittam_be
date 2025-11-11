import fs from "fs";
import http from "http";
import https from "https";
import dotenv from "dotenv";
import { createServer } from "./app";
import { connectMongo } from "./utils/db";

dotenv.config();

const start = async () => {
  const app = createServer();
  const PORT = Number(process.env.PORT || 4000);
  const HOST = process.env.HOST || "0.0.0.0"; // important for EC2/public
  const HTTPS_ENABLED = process.env.HTTPS_ENABLED === "true";

  try {
    await connectMongo();

    if (HTTPS_ENABLED) {
      const keyPath = process.env.SSL_KEY_PATH || "./cert/server.key";
      const certPath = process.env.SSL_CERT_PATH || "./cert/server.cert";

      if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
        console.error(`❌ SSL certificate files not found at:
  Key:  ${keyPath}
  Cert: ${certPath}
Please check your SSL paths or disable HTTPS.`);
        process.exit(1);
      }

      const key = fs.readFileSync(keyPath);
      const cert = fs.readFileSync(certPath);

      const httpsServer = https.createServer({ key, cert }, app);

      httpsServer.listen(PORT, HOST, () => {
        console.log(`✅ HTTPS server running at https://${HOST}:${PORT}`);
        console.log(`🌍 Accessible via: https://${process.env.PUBLIC_HOST || "your-ec2-public-dns"}:${PORT}`);
      });
    } else {
      const httpServer = http.createServer(app);

      httpServer.listen(PORT, HOST, () => {
        console.log(`🚀 HTTP server running at http://${HOST}:${PORT}`);
        console.log(`🌍 Accessible via: http://${process.env.PUBLIC_HOST || "your-ec2-public-dns"}:${PORT}`);
      });
    }
  } catch (err: any) {
    console.error("❌ Fatal startup error:", err.message);
    process.exit(1);
  }
};

start();
