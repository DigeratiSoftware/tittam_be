"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSuperAdmin = exports.requireAdminOrSelfForParam = exports.authGuard = void 0;
const security_1 = require("../utils/security");
const http_error_1 = require("../utils/http-error");
/**
 * Middleware: Validates access token and attaches user info to req
 */
const authGuard = (req, _res, next) => {
    console.log(req.params);
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return next(new http_error_1.HttpError(401, 'Missing token'));
    }
    try {
        const token = header.split(' ')[1];
        const payload = security_1.jwtAdapter.verifyAccess(token); // must return { sub, email, role }
        req.user = {
            userId: payload.userId, // use 'userId' from JWT payload
            email: payload.email,
            role: payload.role,
        };
        req.userEmail = payload.email; // 🔑 shortcut for createdBy / updatedBy
        next();
    }
    catch (e) {
        return next(new http_error_1.HttpError(401, 'Invalid or expired access token'));
    }
};
exports.authGuard = authGuard;
/**
 * Middleware: Only admins or the user themselves can access
 */
const requireAdminOrSelfForParam = (req, _res, next) => {
    const user = req.user;
    if (!user)
        return next(new http_error_1.HttpError(401, 'Unauthorized'));
    if (user.role === 'admin')
        return next();
    if (user.userId === req.params.id)
        return next();
    return next(new http_error_1.HttpError(403, 'Forbidden'));
};
exports.requireAdminOrSelfForParam = requireAdminOrSelfForParam;
const requireSuperAdmin = (req, _res, next) => {
    const user = req.user;
    if (!user)
        return next(new http_error_1.HttpError(401, 'Unauthorized'));
    if (user.role === 'super_admin')
        return next();
    return next(new http_error_1.HttpError(403, 'Forbidden'));
};
exports.requireSuperAdmin = requireSuperAdmin;
