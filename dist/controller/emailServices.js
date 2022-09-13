"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const validation_1 = require("../utils/validation");
dotenv_1.default.config();
async function sendEmail(email) {
    const password = process.env.EMAIL_PASS;
    const isValid = validation_1.emailValidation.safeParse(email);
    if (!isValid.success) {
        throw new Error("Invalid email");
    }
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "pod.b.decagon@gmail.com",
            pass: password
        }
    });
    const mailOptions = {
        from: "pod.b.decagon@gmail.com",
        to: isValid.data.email,
        subject: "User Verification",
        text: "Please confirm your email",
        // html: `<p>${message}</p>`
    };
    return transporter.sendMail(mailOptions, (err, info) => { err ? err : info; });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=emailServices.js.map