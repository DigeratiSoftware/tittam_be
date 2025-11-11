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
  const HTTPS_ENABLED = process.env.HTTPS_ENABLED === "true";

  await connectMongo();

  if (HTTPS_ENABLED) {
    try {
      const key = fs.readFileSync(process.env.SSL_KEY_PATH || "./cert/server.key");
      const cert = fs.readFileSync(process.env.SSL_CERT_PATH || "./cert/server.cert");

      const httpsServer = https.createServer({ key, cert }, app);

      httpsServer.listen(PORT, () => {
        console.log(`✅ HTTPS Server running at https://localhost:${PORT}`);
      });
    } catch (err) {
      console.error("❌ Failed to start HTTPS server:", err);
      process.exit(1);
    }
  } else {
    const httpServer = http.createServer(app);
    httpServer.listen(PORT, () => {
      console.log(`🚀 HTTP Server running at http://localhost:${PORT}`);
    });
  }
};

start().catch((err) => {
  console.error("❌ Fatal startup error:", err);
  process.exit(1);
});
