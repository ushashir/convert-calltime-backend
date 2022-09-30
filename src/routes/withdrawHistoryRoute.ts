import { Router } from "express";
import { withdraw } from "../controller/withdrawHistoryController";
import { auth } from "../utils/authMiddleware";
import { userRequest } from "../types/express";

const router = Router();

router.post("/", auth, async (req: userRequest, res) => {
    try {
        const data = req.body;
        const id = req.user.user_id;

        const response = await withdraw(data, id);
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

}
);


export default router;