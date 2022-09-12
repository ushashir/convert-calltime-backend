"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const validation_1 = require("../utils/validation");
const prisma_config_1 = __importDefault(require("../utils/prisma_config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function registerUser(data) {
    const validData = validation_1.registerUSerSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    const record = validData.data;
    if (record.password != record.confirmPassword) {
        throw "Password and Confirm password didn't match";
    }
    // check for duplicate mail, phone and username
    const duplicateMail = await prisma_config_1.default.user.findFirst({ where: { email: record.email } });
    if (duplicateMail)
        throw "Email already exist";
    const duplicatePhone = await prisma_config_1.default.user.findFirst({ where: { phone: record.phone } });
    if (duplicatePhone)
        throw "Phone number already exist";
    const duplicateUserName = await prisma_config_1.default.user.findFirst({ where: { userName: record.userName } });
    if (duplicateUserName)
        throw "User name already exist";
    const hashPw = await bcrypt_1.default.hash(record.password, 8);
    return prisma_config_1.default.user.create({
        data: {
            firstName: record.firstName,
            lastName: record.lastName,
            userName: record.userName,
            email: record.email,
            phone: record.phone,
            password: hashPw
        },
        select: {
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
            phone: true
        }
    });
}
exports.registerUser = registerUser;
//# sourceMappingURL=userController.js.map