import { sendEmail, verifyUser } from "../controller/emailServices";
import { Router } from "express";
import {
	registerUser,
	loginUser,
	updateUser,
	forgotPassword,
	resetPassword,
	getById,
} from "../controller/userController";
import { auth } from "../utils/authMiddleware";
import { userRequest } from "../types/express";
import { PayFlutter } from "../controller/flutterwaveController";

const router = Router();

router.get("/verify/:token", async (req, res) => {
	const token = req.params.token;

	try {
		const response = await verifyUser(token);
		return res.status(200).json({ message: "user verified", response });
	} catch (error) {
		return res.status(400).json(error);
	}
});

router.post("/confirmation", async (req, res) => {
	try {
		const response = await sendEmail(req.body);
		return res
			.status(200)
			.json({ message: "Email sent successfully", response });
	} catch (error) {
		return res.status(400).json({
			message: "An error occurred",
			error,
		});
	}
});

router.get("/", auth, async (req: userRequest, res) => {
	try {
		const id = req.user.user_id;
		const response = await getById(id);
		return res.status(200).json({ message: "success", response });
	} catch (error) {
		res.status(400).json(error);
	}
});

/* POST register users*/
router.post("/", async (req, res) => {
	try {
		const data = req.body;
		const response = await registerUser(data);
		return res.status(201).json({
			message: "Success",
			response,
		});
	} catch (error) {
		return res.status(400).json({
			message: error,
		});
	}
});

/* PATCH update user */
router.patch("/", auth, async (req: userRequest, res) => {
	try {
		const data = req.body;
		const id = req.user.user_id;

		const response = await updateUser({ ...data, id });
		return res.status(200).json({
			message: "Success",
			response,
		});
	} catch (error) {
		return res.status(400).json({
			message: error,
		});
	}
});

/* POST Login users */
router.post("/login", async (req, res) => {
	try {
		const data = req.body;
		const response = await loginUser(data);
		return res.status(200).json({
			message: "Success",
			response,
		});
	} catch (error) {
		return res.status(400).json({ message: error });
	}
});

/*POST forgot password */
router.post("/forgotpassword", async (req, res) => {
	try {
		const data = req.body;
		const response = await forgotPassword(data);
		return res.status(200).json({
			message: "Check your email to reset your password",
			response,
		});
	} catch (error) {
		return res.status(400).json({ message: error });
	}
});

/*POST reset password */
router.post("/resetpassword", async (req, res) => {
	const token = req.body.token;
	const newPassword: string = req.body.password;
	try {
		await resetPassword(token, newPassword);
		return res.status(200).json({ message: "Success" });
	} catch (error) {
		return res.status(400).json(error);
	}
});

router.post("/payment", async (req, res) => {
	console.log("Ran here");
	const data = req.body;
	console.log("Ran here data", data);
	try {
		const response = await PayFlutter(data);
		res.status(200).json({
			message: "Successful",
			response,
		});
		return;
	} catch (error) {
		return res.status(400).json({
			message: "An error occurred",
			error,
		});
	}
});

export default router;
