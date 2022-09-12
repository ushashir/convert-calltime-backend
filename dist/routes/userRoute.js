"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailServices_1 = require("../controller/emailServices");
const router = express_1.default.Router();
router.post('/confirmEmail', emailServices_1.sendEmail);
exports.default = router;
//# sourceMappingURL=userRoute.js.map