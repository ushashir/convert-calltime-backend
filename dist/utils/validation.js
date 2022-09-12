"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUSerSchema = exports.loginUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginUserSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.registerUSerSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    userName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phone: zod_1.default.string(),
    password: zod_1.default.string().min(4),
    confirmPassword: zod_1.default.string().min(4),
    avatar: zod_1.default.string().optional(),
    isVerified: zod_1.default.boolean().optional()
});
//# sourceMappingURL=validation.js.map