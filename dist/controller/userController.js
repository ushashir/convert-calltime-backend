"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const validation_1 = require("../utils/validation");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const hashPassword_1 = require("../utils/hashPassword");
const authMiddleware_1 = require("../utils/authMiddleware");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
async function registerUser(data) {
    const validData = validation_1.registerUSerSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    const record = validData.data;
    if (record.password !== record.confirmPassword) {
        throw "Password and Confirm password didn't match";
    }
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
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
            phone: true,
            id: true
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
        throw `Incorrect password. Access denied`;
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
    console.log('@userController 81:=');
    const avatar = data.avatar;
    console.log('@userController 84:=', avatar);
    let uploadedResponse;
    if (avatar) {
        uploadedResponse = await cloudinary_1.default.uploader.upload(avatar, {
            allowed_formats: ['jpg', 'png', "svg", "jpeg"],
            folder: "live-project"
        });
        if (!uploadedResponse)
            throw Error;
    }
    const record = validData.data;
    return prismaClient_1.default.user.update({
        where: {
            id
        },
        data: {
            avatar: uploadedResponse ? uploadedResponse.url : null,
            firstName: record.firstName,
            lastName: record.lastName,
            phone: record.phone
        },
        select: {
            avatar: true,
            firstName: true,
            lastName: true,
            phone: true
        }
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map