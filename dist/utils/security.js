"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAdapter = exports.hashStrategy = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ms_1 = __importDefault(require("ms"));
const SALT_ROUNDS = 10;
class BcryptStrategy {
    async hash(plain) {
        const salt = await bcryptjs_1.default.genSalt(SALT_ROUNDS);
        return bcryptjs_1.default.hash(plain, salt);
    }
    async compare(plain, hash) {
        return bcryptjs_1.default.compare(plain, hash);
    }
}
exports.hashStrategy = new BcryptStrategy();
exports.jwtAdapter = {
    generateTokens(payload) {
        const accessSecret = process.env.JWT_ACCESS_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        const accessExpiresInStr = (process.env.JWT_ACCESS_EXPIRES_IN || '1d');
        const refreshExpiresInStr = (process.env.JWT_REFRESH_EXPIRES_IN || '180d');
        const accessExpiresIn = (0, ms_1.default)(accessExpiresInStr) / 1000; // seconds
        const refreshExpiresIn = (0, ms_1.default)(refreshExpiresInStr) / 1000; // seconds
        const optionsAccess = { expiresIn: accessExpiresIn };
        const optionsRefresh = { expiresIn: refreshExpiresIn };
        const accessToken = jsonwebtoken_1.default.sign(payload, accessSecret, optionsAccess);
        const refreshToken = jsonwebtoken_1.default.sign(payload, refreshSecret, optionsRefresh);
        return { accessToken, refreshToken };
    },
    verifyAccess(token) {
        const secret = process.env.JWT_ACCESS_SECRET;
        return jsonwebtoken_1.default.verify(token, secret);
    },
    verifyRefresh(token) {
        const secret = process.env.JWT_REFRESH_SECRET;
        return jsonwebtoken_1.default.verify(token, secret);
    },
};
