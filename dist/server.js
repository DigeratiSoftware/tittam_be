"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const db_1 = require("./utils/db");
dotenv_1.default.config();
const start = async () => {
    const app = (0, app_1.createServer)();
    const PORT = Number(process.env.PORT || 4000);
    const HOST = process.env.HOST || "0.0.0.0"; // important for EC2/public
    const HTTPS_ENABLED = process.env.HTTPS_ENABLED === "true";
    try {
        await (0, db_1.connectMongo)();
        if (HTTPS_ENABLED) {
            const keyPath = process.env.SSL_KEY_PATH || "./cert/server.key";
            const certPath = process.env.SSL_CERT_PATH || "./cert/server.cert";
            if (!fs_1.default.existsSync(keyPath) || !fs_1.default.existsSync(certPath)) {
                console.error(`❌ SSL certificate files not found at:
  Key:  ${keyPath}
  Cert: ${certPath}
Please check your SSL paths or disable HTTPS.`);
                process.exit(1);
            }
            const key = fs_1.default.readFileSync(keyPath);
            const cert = fs_1.default.readFileSync(certPath);
            const httpsServer = https_1.default.createServer({ key, cert }, app);
            httpsServer.listen(PORT, HOST, () => {
                console.log(`✅ HTTPS server running at https://${HOST}:${PORT}`);
                console.log(`🌍 Accessible via: https://${process.env.PUBLIC_HOST || "your-ec2-public-dns"}:${PORT}`);
            });
        }
        else {
            const httpServer = http_1.default.createServer(app);
            httpServer.listen(PORT, HOST, () => {
                console.log(`🚀 HTTP server running at http://${HOST}:${PORT}`);
                console.log(`🌍 Accessible via: http://${process.env.PUBLIC_HOST || "your-ec2-public-dns"}:${PORT}`);
            });
        }
    }
    catch (err) {
        console.error("❌ Fatal startup error:", err.message);
        process.exit(1);
    }
};
start();
