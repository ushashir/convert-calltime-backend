import { response, Router } from "express";

import { updateWallet } from "../controller/walletController";

const router = Router();

// Create an API to update the user wallet.
// This endpoint will take the amount and user email from the request body, this amount is then used to update the user wallet.
// That is the amount to be updated will be added to the current wallet balance.
// update wallet endpoint

router.post("/update", async (req, res) => {
	try {
		const amount = req.body.amount;
		console.log(amount);
		
		// const amount = "100";
		const response = await updateWallet(amount);
		return res.status(200).json({
			message: "Wallet succesfully update",
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
