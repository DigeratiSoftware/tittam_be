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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHistory = exports.User = exports.Counter = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const counterSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});
exports.Counter = mongoose_1.default.model("Counter", counterSchema);
// User Schema
const userSchema = new mongoose_1.Schema({
    userId: { type: String, unique: true }, // remove required, counter will assign
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin', 'super_admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String },
    updatedBy: { type: String },
    loginStatus: { type: Boolean, default: false },
    currentLoginAt: { type: Date },
    lastLoginAt: { type: Date },
}, { timestamps: true });
// ---------------- Password Compare Method ----------------
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.password);
};
// -------- Auto Increment for userId using Counter Collection --------
userSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const counterDoc = await exports.Counter.findByIdAndUpdate({ _id: "userId" }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.userId = `USR${String(counterDoc.seq).padStart(3, "0")}`;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    else {
        next();
    }
});
exports.User = mongoose_1.default.model("User", userSchema);
const loginHistorySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: String, required: true },
    logins: [
        {
            loginAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
exports.LoginHistory = mongoose_1.default.model("LoginHistory", loginHistorySchema);
