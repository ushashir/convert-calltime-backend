import { Router } from "express";
import { updateWallet } from "../controller/walletController";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";

const router = Router();

router.patch("/", auth, async (req:userRequest, res) => {
	try {
		const data = req.body;
		const id = req.user.user_id;
		const response = await updateWallet({ ...data, id});
		return res.status(200).json({
			message: "Success",
			response
		})
	} catch (error) {
		return res.status(400).json({
			message: error
		})
	}
});

export default router;
