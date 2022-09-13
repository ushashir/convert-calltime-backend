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
        // console.log(error);
        res.status(500).json({
            message: "An error occurred",
            error
        });
    }
});
/* POST register users */
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.registerUser)(data);
        res.status(201).json({
            msg: "success, new user created",
            response
        });
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
/* Login users */
router.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, userController_1.loginUser)(data);
        res.status(201).json({
            msg: "User successfully logged in",
            response
        });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
});
/* POST update user */
router.patch("/:id", async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const response = await (0, userController_1.updateUser)(data, Number(id));
        res.status(200).json({
            msg: "success, user updated",
            response
        });
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map