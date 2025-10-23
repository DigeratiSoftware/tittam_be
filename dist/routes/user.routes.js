"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const User = __importStar(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
exports.userRouter = (0, express_1.Router)();
// ---------------- AUTH ----------------
exports.userRouter.post('/register', auth_1.authGuard, auth_1.requireSuperAdmin, User.register); // create new user
exports.userRouter.post('/login', User.login); // login by email or phone
exports.userRouter.post('/refresh', User.refresh); // refresh tokens
exports.userRouter.post('/logout', auth_1.authGuard, User.logout); // logout user
// ---------------- PROFILE ----------------
exports.userRouter.patch('/me', auth_1.authGuard, User.updateUser); // update own profile
// ---------------- ADMIN / USER MANAGEMENT ----------------
exports.userRouter.patch('/:userId/activate', auth_1.authGuard, auth_1.requireSuperAdmin, User.activateUser);
exports.userRouter.patch('/:userId/deactivate', auth_1.authGuard, auth_1.requireSuperAdmin, User.deactivateUser);
exports.userRouter.delete('/:userId', auth_1.authGuard, auth_1.requireSuperAdmin, User.deleteUser);
exports.userRouter.patch('/:userId/password', auth_1.authGuard, auth_1.requireSuperAdmin, User.updatePassword); // update own password
// ---------------- GET CURRENT USER (optional) ----------------
exports.userRouter.get('/me', auth_1.authGuard, async (req, res) => {
    res.json(req.user);
});
// ---------------- GET CURRENT USER (optional) ----------------
exports.userRouter.get('/me', auth_1.requireSuperAdmin, async (req, res) => {
    res.json(req.user);
});
// ---------------- GET ALL USERS ----------------
exports.userRouter.get('/', auth_1.authGuard, auth_1.requireSuperAdmin, User.getAllUsers);
