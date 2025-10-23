"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./utils/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const start = async () => {
    const app = (0, app_1.createServer)();
    const PORT = Number(process.env.PORT || 4000);
    await (0, db_1.connectMongo)();
    app.listen(PORT, () => {
        console.log(`🚀 User service listening on http://localhost:${PORT}`);
    });
};
start().catch((err) => {
    console.error('Fatal start error', err);
    process.exit(1);
});
