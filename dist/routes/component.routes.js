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
exports.componentRouter = void 0;
const express_1 = require("express");
const Component = __importStar(require("../controllers/component.controller"));
const auth_1 = require("../middleware/auth");
exports.componentRouter = (0, express_1.Router)();
// Public / protected routes
exports.componentRouter.get("/", auth_1.authGuard, Component.getAllComponents);
exports.componentRouter.get("/:id", auth_1.authGuard, Component.getComponentById);
exports.componentRouter.post("/", auth_1.authGuard, Component.createComponent);
exports.componentRouter.put("/:id", auth_1.authGuard, Component.updateComponent);
exports.componentRouter.delete("/:id", auth_1.authGuard, Component.deleteComponent);
exports.componentRouter.patch("/:id/status", auth_1.authGuard, Component.setComponentStatus);
exports.componentRouter.patch("/:id/fields-count", auth_1.authGuard, Component.updateFieldsCount);
