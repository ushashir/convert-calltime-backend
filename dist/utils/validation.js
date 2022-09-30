"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletSchema = exports.createAccountSchema = exports.updateUserSchema = exports.registerUSerSchema = exports.emailSchema = exports.loginUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginUserSchema = zod_1.default.object({
    email: zod_1.default.string().email().optional(),
    userName: zod_1.default.string().trim().optional(),
    password: zod_1.default.string(),
});
exports.emailSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
});
exports.registerUSerSchema = zod_1.default
    .object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    userName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phone: zod_1.default.string(),
    password: zod_1.default.string({
        required_error: "Password is required",
    }).min(6, { message: "Password must be 6 or more characters long" }),
    confirmPassword: zod_1.default.string().min(6, { message: "Confirm password must be 6 or more characters long" }),
    avatar: zod_1.default.string().optional(),
    isVerified: zod_1.default.boolean().optional(),
})
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Password did not match confirm password",
        });
    }
});
exports.updateUserSchema = zod_1.default.object({
    firstName: zod_1.default.string().optional(),
    lastName: zod_1.default.string().optional(),
    userName: zod_1.default.string().optional(),
    email: zod_1.default.string().email().optional(),
    phone: zod_1.default.string().optional(),
    password: zod_1.default.string().min(4).optional(),
    confirmPassword: zod_1.default.string().min(4).optional(),
    avatar: zod_1.default.string().optional(),
    isVerified: zod_1.default.boolean().optional(),
});
exports.createAccountSchema = zod_1.default.object({
    bankName: zod_1.default.string(),
    accountName: zod_1.default.string(),
    accountNumber: zod_1.default.string(),
    wallet: zod_1.default.number().optional().default(0),
});
exports.updateWalletSchema = zod_1.default.object({
    amount: zod_1.default.string(),
});
//# sourceMappingURL=validation.js.map