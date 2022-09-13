"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailServices_1 = require("../controller/emailServices");
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post("/confirmEmail", async (req, res) => {
    try {
        const response = await (0, emailServices_1.sendEmail)(req.body.email);
        res.status(200).json({ message: "Email sent successfully", response });
    }
    catch (error) {
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
exports.default = router;
//# sourceMappingURL=userRoute.js.map