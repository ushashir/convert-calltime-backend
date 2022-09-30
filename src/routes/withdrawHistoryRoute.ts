import { Router } from "express";
import { withdraw } from "../controller/withdrawHistoryController";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const response = await withdraw(data);
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