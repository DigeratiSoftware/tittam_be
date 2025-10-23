"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const http_error_1 = require("../utils/http-error");
const security_1 = require("../utils/security");
exports.userService = {
    // ---------------- REGISTER ----------------
    async register(name, email, password, role, phone, isActive, createdBy) {
        const existing = await user_repository_1.userRepository.findOne({
            $or: [{ email }, { phone }],
        });
        if (existing) {
            if (existing.email === email) {
                throw new http_error_1.HttpError(409, "Email already in use");
            }
            if (phone && existing.phone === phone) {
                throw new http_error_1.HttpError(409, "Phone number already in use");
            }
        }
        const hashed = await security_1.hashStrategy.hash(password);
        await user_repository_1.userRepository.create({
            name,
            email,
            password: hashed,
            phone,
            role,
            isActive: isActive ?? true,
            createdBy: createdBy || "system",
        });
        return { success: true, message: "User registered successfully" };
    },
    // ---------------- LOGIN ----------------
    async login(username, password) {
        // Find user by email or phone number
        const user = await user_repository_1.userRepository.findOne({
            $or: [{ email: username }, { phone: username }],
        });
        if (!user)
            throw new http_error_1.HttpError(401, 'Invalid credentials');
        const ok = await user.comparePassword(password);
        if (!ok)
            throw new http_error_1.HttpError(401, 'Invalid credentials');
        if (user.isActive !== true)
            throw new http_error_1.HttpError(403, 'User is not active');
        const tokens = security_1.jwtAdapter.generateTokens({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { success: true, user: sanitize(user), ...tokens };
    },
    // ---------------- FIND USER ----------------
    async findUser(username) {
        // identifier can be email or phone number
        const user = await user_repository_1.userRepository.findOne({
            $or: [{ email: username }, { phone: username }],
        });
        if (!user)
            throw new http_error_1.HttpError(404, 'User not found');
        return user;
    },
    // ---------------- GET ALL USERS ----------------
    async getAllUsers() {
        const users = await user_repository_1.userRepository.findMany({});
        return users.map(u => sanitize(u));
    },
    // ---------------- REFRESH ----------------
    async refresh(refreshToken) {
        const payload = security_1.jwtAdapter.verifyRefresh(refreshToken);
        const user = await user_repository_1.userRepository.findById(payload.userId);
        if (!user)
            throw new http_error_1.HttpError(404, 'User not found');
        const tokens = security_1.jwtAdapter.generateTokens({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { user: sanitize(user), ...tokens };
    },
    // ---------------- UPDATE USER ----------------
    async updateUser(userId, data) {
        data.updatedBy = data.updatedBy || 'system';
        const updated = await user_repository_1.userRepository.updateById(userId, data);
        if (!updated)
            throw new http_error_1.HttpError(404, 'User not found');
        return sanitize(updated);
    },
    // ---------------- UPDATE PASSWORD ----------------
    async updatePassword(userId, newPassword, updatedBy) {
        const hashed = await security_1.hashStrategy.hash(newPassword);
        await user_repository_1.userRepository.updateById(userId, {
            password: hashed,
            updatedBy,
            updatedAt: new Date(),
        });
        return { success: true, message: "Password updated successfully" };
    },
    // ---------------- SET STATUS ----------------
    async setStatus(userId, status, updatedBy) {
        const updated = await user_repository_1.userRepository.updateById(userId, {
            isActive: status,
            updatedBy: updatedBy || 'system',
        });
        if (!updated)
            throw new http_error_1.HttpError(404, 'User not found');
        return sanitize(updated);
    },
    // ---------------- DELETE USER ----------------
    async deleteUser(userId) {
        const deleted = await user_repository_1.userRepository.deleteById(userId);
        if (!deleted)
            throw new http_error_1.HttpError(404, 'User not found');
        return { message: 'User deleted' };
    },
};
// ---------------- HELPER ----------------
function sanitize(u) {
    if (u.toObject) {
        const { password, __v, ...rest } = u.toObject();
        return rest;
    }
    const { password, __v, ...rest } = u;
    return rest;
}
