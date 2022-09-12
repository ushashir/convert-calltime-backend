"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
async function sendEmail(req, res) {
    const password = process.env.EMAIL_PASS;
    // const { email, name, message } = req.body;
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: 'pod.b.decagon@gmail.com',
                pass: password
            }
        });
        const mailOptions = {
            from: 'pod.b.decagon@gmail.com',
            to: 'ayodejisoyebo@gmail.com',
            subject: "User Verification",
            text: "Please confirm your email",
            // html: `<p>${message}</p>`
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(400).json({
                    message: "An error occurred",
                    err
                });
            }
            else {
                res.status(200).json({
                    message: "Email sent successfully",
                    info
                });
            }
        });
        res.send("Email sent");
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to send email',
            route: "/confirmEmail"
        });
    }
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=emailServices.js.map