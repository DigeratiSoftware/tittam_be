"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.logout = exports.deleteUser = exports.deactivateUser = exports.activateUser = exports.updateUser = exports.refresh = exports.login = exports.updatePassword = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const user_model_1 = require("../models/user.model");
// ------------------ REGISTER ------------------
const register = async (req, res, next) => {
    try {
        const { name, email, password, role, phone, isActive } = req.body;
        const createdBy = req.userEmail || "system";
        const result = await user_service_1.userService.register(name, email, password, role, phone, isActive, createdBy);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
// ------------------ UPDATE PASSWORd ------------------
const updatePassword = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;
        const updatedBy = req.userEmail || "system";
        const result = await user_service_1.userService.updatePassword(userId, newPassword, updatedBy);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.updatePassword = updatePassword;
// ------------------ LOGIN ------------------
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await user_service_1.userService.login(username, password);
        const user = await user_service_1.userService.findUser(username);
        const now = new Date();
        user.lastLoginAt = user.currentLoginAt;
        user.currentLoginAt = now;
        user.loginStatus = true;
        await user.save();
        await user_model_1.LoginHistory.findOneAndUpdate({ user: user._id }, { $push: { logins: { loginTime: now } } }, { upsert: true, new: true });
        res.json({
            ...result,
            currentLoginAt: user.currentLoginAt,
            lastLoginAt: user.lastLoginAt,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
// ------------------ REFRESH TOKEN ------------------
const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return res.status(400).json({ message: "Refresh token required" });
        const result = await user_service_1.userService.refresh(refreshToken);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.refresh = refresh;
// ------------------ UPDATE USER ------------------
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        updates.updatedBy = req.userEmail || "system";
        const result = await user_service_1.userService.updateUser(id, updates);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
// ------------------ ACTIVATE USER ------------------
const activateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updatedBy = req.userEmail || "system";
        const result = await user_service_1.userService.updateUser(userId, { isActive: true, updatedBy });
        res.json({ message: "User activated", result });
    }
    catch (err) {
        next(err);
    }
};
exports.activateUser = activateUser;
// ------------------ DEACTIVATE USER ------------------
const deactivateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updatedBy = req.userEmail || "system";
        const result = await user_service_1.userService.updateUser(userId, { isActive: false, updatedBy });
        res.json({ message: "User deactivated", result });
    }
    catch (err) {
        next(err);
    }
};
exports.deactivateUser = deactivateUser;
// ------------------ DELETE USER ------------------
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await user_service_1.userService.deleteUser(userId);
        res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
// ------------------ LOGOUT ------------------
const logout = async (req, res, next) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const user = await user_model_1.User.findById(req.user.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        user.loginStatus = false;
        await user.save();
        res.json({ message: "User logged out successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
const getAllUsers = async (req, res, next) => {
    try {
        // only super_admin can access
        if (!req.user || req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const users = await user_service_1.userService.getAllUsers();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllUsers = getAllUsers;
