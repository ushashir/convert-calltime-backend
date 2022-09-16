"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailServices_1 = require("../controller/emailServices");
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get("/verify/:token", async (req, res) => {
    const token = req.params.token;
    try {
        const response = await (0, emailServices_1.verifyUser)(token);
        res.status(200).json({ message: "user verified", response });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.post("/confirmation", async (req, res) => {
    try {
        const response = await (0, emailServices_1.sendEmail)(req.body);
        res.status(200).json({ message: "Email sent successfully", response });
    }
    catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error
        });
    }
});
/* POST register users*/
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.registerUser)(data);
        res.status(201).json({
            message: "Success",
            response
        });
    }
    catch (error) {
        res.status(400).json({
            message: error
        });
    }
});
/* POST update user */
router.patch("/:id", async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const response = await (0, userController_1.updateUser)(data, id);
        res.status(200).json({
            message: "Success",
            response
        });
    }
    catch (error) {
        res.status(400).json({
            message: error
        });
    }
});
/* POST Login users */
router.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.loginUser)(data);
        res.status(200).json({
            message: "Success",
            response
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
/*POST forgot password */
router.post("/forgotpassword", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.forgotPassword)(data);
        res.status(200).json({
            message: "Check your email to reset your password",
            response
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
router.get("/resetpassword/:token", (req, res) => {
    const token = req.params.token;
    res.send(`<form method="POST" action="/api/users/resetpassword">
		<input type="hidden" value=${token} name="token">
		<input type="password" name="password" placeholder="Enter new password"/>
		<input type="submit" name="submit" value="Change password" />
		</form>
	`);
});
router.post("/resetpassword", async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;
    try {
        await (0, userController_1.resetPassword)(token, newPassword);
        res.status(200).json({ message: "Success" });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map