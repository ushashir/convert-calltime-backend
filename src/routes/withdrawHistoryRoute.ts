import { Router } from "express";
import { walletBalanceFunc } from "../controller/withdrawHistoryController";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";

const router = Router();

router.post("/", auth, async (req: userRequest, res) => {
    try {
        const data = req.body;
        const id = req.user.user_id
        const response = await walletBalanceFunc(data, id);
        return res.status(201).json({
            message: "Success",
            response
        });
    } catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error
        });
    }

});

router.post("/succeful", auth, async (req: userRequest, res) => {
    try {
        const data = req.body;
        const id = req.user.user_id
        // const response = await ;
        return res.status(201).json({
            message: "Success",
            // response
        });
    } catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error
        });
    }

});

router.post("/failed", auth, async (req: userRequest, res) => {
    try {
        const data = req.body;
        const id = req.user.user_id
        const response = await walletBalanceFunc(data, id);
        return res.status(201).json({
            message: "Success",
            response
        });
    } catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error
        });
    }

});




export default router;