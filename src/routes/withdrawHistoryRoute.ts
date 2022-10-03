import { Router } from "express";
import { failedHistory, successHistory, userWithdrawal, walletBalanceFunc } from "../controller/withdrawHistoryController";
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

router.post("/successful", auth, async (req: userRequest, res) => {
    try {
        const data = req.body;
        const id = req.user.user_id
        const response = await successHistory(data, id);
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

router.post("/failed", auth, async (req: userRequest, res) => {
    try {
        const data = req.body;
        const id = req.user.user_id
        const response = await failedHistory(data, id);
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

router.get('/', auth, async(req:userRequest, res) => {
    try {
        const {user_id} = req.user
        const response = await userWithdrawal(user_id)
        return res.status(200).json({message:"success", response})
    }catch (error) {
        return res.status(400).json({Error, error})
    }
})



export default router;