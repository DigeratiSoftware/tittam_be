"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
exports.userRepository = {
    // ---------------- CREATE ----------------
    async create(data) {
        return user_model_1.User.create(data);
    },
    // ---------------- FIND ----------------
    async findById(id) {
        return user_model_1.User.findById(id);
    },
    async findOne(filter) {
        return user_model_1.User.findOne(filter);
    },
    // ---------------- UPDATE ----------------
    async updateById(id, update) {
        return user_model_1.User.findByIdAndUpdate(id, { ...update, updatedAt: new Date() }, // auto set updatedAt
        { new: true });
    },
    // ---------------- DELETE ----------------
    async deleteById(id) {
        console.log(id, "suser");
        return user_model_1.User.findByIdAndDelete(id);
    },
    // ---------------- STATUS ----------------
    async setStatus(id, status, updatedBy) {
        return user_model_1.User.findByIdAndUpdate(id, {
            status,
            updatedBy: updatedBy || 'system',
            updatedAt: new Date(),
        }, { new: true });
    },
    // ---------------- LOGIN META ----------------
    async updateLoginMeta(id, loginStatus) {
        return user_model_1.User.findByIdAndUpdate(id, {
            loginStatus,
            currentLoginTime: loginStatus ? new Date() : undefined,
            lastLoginTime: !loginStatus ? new Date() : undefined,
        }, { new: true });
    },
    // ---------------- FIND MANY ----------------
    async findMany(filter = {}) {
        return user_model_1.User.find(filter);
    }
};
