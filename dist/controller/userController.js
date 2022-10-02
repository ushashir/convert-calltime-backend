"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.resetPassword = exports.forgotPassword = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const validation_1 = require("../utils/validation");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword_1 = require("../utils/hashPassword");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const authMiddleware_1 = require("../utils/authMiddleware");
const emailService_1 = require("../utils/emailService");
const emailServices_1 = require("./emailServices");
async function registerUser(data) {
    const validData = validation_1.registerUSerSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    const record = validData.data;
    // check for duplicate mail, phone and username
    const duplicateMail = await prismaClient_1.default.user.findFirst({
        where: { email: record.email },
    });
    if (duplicateMail)
        throw "Email already exist";
    const duplicatePhone = await prismaClient_1.default.user.findFirst({
        where: { phone: record.phone },
    });
    if (duplicatePhone)
        throw "Phone number already exist";
    const duplicateUserName = await prismaClient_1.default.user.findFirst({
        where: { userName: record.userName },
    });
    if (duplicateUserName)
        throw "User name already exist";
    const response = prismaClient_1.default.user.create({
        data: {
            firstName: record.firstName,
            lastName: record.lastName,
            userName: record.userName,
            email: record.email,
            phone: record.phone,
            avatar: "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
            password: (await (0, hashPassword_1.encryptPassword)(record.password)),
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
            phone: true,
            wallet: true
        },
    });
    (0, emailServices_1.sendEmail)({ email: (await response).email });
    return `Hello ${(await response).firstName}, please check your email to confirm ${(await response).email}`;
}
exports.registerUser = registerUser;
async function loginUser(data) {
    const isValidData = validation_1.loginUserSchema.safeParse(data);
    if (!isValidData.success) {
        throw isValidData.error;
    }
    const record = isValidData.data;
    let user;
    if (record.email) {
        user = await prismaClient_1.default.user.findUnique({ where: { email: record.email } });
    }
    else if (record.userName) {
        user = await prismaClient_1.default.user.findUnique({
            where: { userName: record.userName },
        });
    }
    if (!user) {
        throw "No user with username/email found. Please signup";
    }
    const match = await (0, hashPassword_1.decryptPassword)(record.password, user.password);
    if (!match) {
        throw "Incorrect password. Access denied";
    }
    const { id, firstName, lastName, email, userName, phone, avatar, isVerified, wallet, } = user;
    return {
        token: (0, authMiddleware_1.generateAccessToken)(user.id),
        userdata: {
            id,
            firstName,
            lastName,
            userName,
            email,
            phone,
            avatar,
            isVerified,
            wallet
        },
    };
}
exports.loginUser = loginUser;
async function updateUser(data) {
    const validData = validation_1.updateUserSchema.safeParse(data);
    const id = data.id;
    if (!validData.success) {
        throw validData.error;
    }
    const user = await prismaClient_1.default.user.findFirst({ where: { id } });
    if (!user) {
        throw "Cannot find user";
    }
    const avatar = data.avatar;
    let uploadedResponse;
    if (avatar) {
        uploadedResponse = await cloudinary_1.default.uploader.upload(avatar, {
            allowed_formats: ["jpg", "png", "svg", "jpeg"],
            folder: "live-project"
        });
        if (!uploadedResponse)
            throw Error;
    }
    const record = validData.data;
    return prismaClient_1.default.user.update({
        where: {
            id,
        },
        data: {
            avatar: uploadedResponse ? uploadedResponse.url : record.avatar,
            firstName: record.firstName,
            lastName: record.lastName,
            userName: record.userName,
            phone: record.phone,
            isVerified: record.isVerified,
            password: record.password
                ? (await (0, hashPassword_1.encryptPassword)(record.password))
                : user.password,
            wallet: record.wallet
        },
        select: {
            avatar: true,
            firstName: true,
            lastName: true,
            userName: true,
            phone: true,
            wallet: true
        },
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
    await updateUser({ password: newPassword, id: user.id });
}
exports.resetPassword = resetPassword;
async function getById(id) {
    return await prismaClient_1.default.user.findUnique({
        where: { id },
        select: {
            id: true,
            avatar: true,
            firstName: true,
            lastName: true,
            userName: true,
            phone: true,
            email: true,
            wallet: true
        },
    });
}
exports.getById = getById;
//# sourceMappingURL=userController.js.map