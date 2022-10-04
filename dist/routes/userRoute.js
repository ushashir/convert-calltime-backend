"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailServices_1 = require("../controller/emailServices");
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../utils/authMiddleware");
const flutterwaveController_1 = require("../controller/flutterwaveController");
const router = (0, express_1.Router)();
router.get("/verify/:token", async (req, res) => {
    const token = req.params.token;
    try {
        const response = await (0, emailServices_1.verifyUser)(token);
        return res.status(200).json({ message: "user verified", response });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
router.post("/confirmation", async (req, res) => {
    try {
        const response = await (0, emailServices_1.sendEmail)(req.body);
        return res
            .status(200)
            .json({ message: "Email sent successfully", response });
    }
    catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error,
        });
    }
});
router.get("/", authMiddleware_1.auth, async (req, res) => {
    try {
        const id = req.user.user_id;
        const response = await (0, userController_1.getById)(id);
        return res.status(200).json({ message: "success", response });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
/* POST register users*/
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.registerUser)(data);
        return res.status(201).json({
            message: "Success",
            response,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
/* PATCH update user */
router.patch("/", authMiddleware_1.auth, async (req, res) => {
    try {
        const data = req.body;
        const id = req.user.user_id;
        const response = await (0, userController_1.updateUser)({ ...data, id });
        return res.status(200).json({
            message: "Success",
            response,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
/* POST Login users */
router.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.loginUser)(data);
        return res.status(200).json({
            message: "Success",
            response,
        });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
/*POST forgot password */
router.post("/forgotpassword", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.forgotPassword)(data);
        return res.status(200).json({
            message: "Check your email to reset your password",
            response,
        });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
/*POST reset password */
router.post("/resetpassword", async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;
    try {
        await (0, userController_1.resetPassword)(token, newPassword);
        return res.status(200).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
router.post("/payment", async (req, res) => {
    console.log("Ran here");
    const data = req.body;
    console.log("Ran here data", data);
    try {
        const response = await (0, flutterwaveController_1.PayFlutter)(data);
        res.status(200).json({
            message: "Successful",
            response,
        });
        return;
    }
    catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error,
        });
    }
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map