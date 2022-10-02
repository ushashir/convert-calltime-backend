import { response, Router } from "express";

import { updateWallet } from "../controller/walletController";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";

const router = Router();

// Create an API to update the user wallet.
// This endpoint will take the amount and user email from the request body, this amount is then used to update the user wallet.
// That is the amount to be updated will be added to the current wallet balance.
// update wallet endpoint

router.post("/update", auth, async (req:userRequest, res) => {
	try {
		const amount = req.body.amount;
		const id = req.user.user_id;
		// const amount = "100";
		const response = await updateWallet(amount,id);
		return res.status(200).json({
			message: "Success",
			response,
		})
	} catch (error) {
		console.log(error);
		
		res.status(500).json({
			message: error
		})
	}
});

export default router;
