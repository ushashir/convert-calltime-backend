"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const validation_1 = require("../utils/validation");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword_1 = require("../utils/hashPassword");
const authMiddleware_1 = require("../utils/authMiddleware");
const emailService_1 = require("../utils/emailService");
async function registerUser(data) {
    const validData = validation_1.registerUSerSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    const record = validData.data;
    // check for duplicate mail, phone and username
    const duplicateMail = await prismaClient_1.default.user.findFirst({ where: { email: record.email } });
    if (duplicateMail)
        throw "Email already exist";
    const duplicatePhone = await prismaClient_1.default.user.findFirst({ where: { phone: record.phone } });
    if (duplicatePhone)
        throw "Phone number already exist";
    const duplicateUserName = await prismaClient_1.default.user.findFirst({ where: { userName: record.userName } });
    if (duplicateUserName)
        throw "User name already exist";
    return prismaClient_1.default.user.create({
        data: {
            firstName: record.firstName,
            lastName: record.lastName,
            userName: record.userName,
            email: record.email,
            phone: record.phone,
            password: await (0, hashPassword_1.encryptPassword)(record.password)
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
            phone: true,
            password: true
        }
    });
}
exports.registerUser = registerUser;
async function loginUser(data) {
    //check that information entered by user matches the login schema
    const isValidData = validation_1.loginUserSchema.safeParse(data);
    if (!isValidData.success) {
        throw isValidData.error;
    }
    const record = isValidData.data;
    const user = await prismaClient_1.default.user.findUnique({
        where: {
            email: record.email
        },
    });
    if (!user) {
        throw `No user with ${record.email} found. Please signup`;
    }
    const match = await (0, hashPassword_1.decryptPassword)(record.password, user.password);
    if (!match) {
        throw "Incorrect password. Access denied";
    }
    return (0, authMiddleware_1.generateAccessToken)(user.id);
}
exports.loginUser = loginUser;
async function updateUser(data, id) {
    const validData = validation_1.updateUserSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    const user = await prismaClient_1.default.user.findFirst({ where: { id } });
    if (!user) {
        throw "Cannot find user";
    }
    const record = validData.data;
    return prismaClient_1.default.user.update({
        where: {
            id
        },
        data: {
            firstName: record.firstName,
            lastName: record.lastName,
            phone: record.phone,
            isVerified: record.isVerified,
            avatar: record.avatar,
            userName: record.userName,
            email: record.email,
            password: record.password ? await (0, hashPassword_1.encryptPassword)(record.password) : user.password
        },
        select: {
            firstName: true,
            lastName: true,
            phone: true,
            isVerified: true,
            avatar: true,
            userName: true,
            email: true,
            password: true
        }
    });
}
exports.updateUser = updateUser;
async function forgotPassword(data) {
    const validData = validation_1.emailSchema.safeParse(data);
    if (!validData.success)
        throw validData.error;
    const email = validData.data.email;
    const user = await prismaClient_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw "User does not exist";
    const response = (0, emailService_1.emailServices)(user, "resetpassword");
    return response;
}
exports.forgotPassword = forgotPassword;
async function resetPassword(token, newPassword) {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.AUTH_SECRET);
    const id = decoded;
    const user = await prismaClient_1.default.user.findUnique({ where: { id: id.user_id } });
    if (!user)
        throw "user not found";
    await updateUser({ password: newPassword }, user.id);
}
exports.resetPassword = resetPassword;
//# sourceMappingURL=userController.js.map