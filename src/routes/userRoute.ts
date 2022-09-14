import { sendEmail, verifyUser } from "../controller/emailServices";
import {Router} from "express";
import {registerUser, loginUser, updateUser, forgotPassword, resetPassword} from "../controller/userController";


const router = Router();

router.get("/verify/:token",async (req, res)=>{
	const token = req.params.token;
	try {
		const response = await verifyUser(token);
		res.status(200).json({message: "user verified", response});
	} catch (error) {
		res.status(400).send(error);
	}
});
router.post("/confirmation", async(req, res) => {
	try {
   
		const response = await sendEmail(req.body);
		res.status(200).json({message: "Email sent successfully", response});
  
	} catch (error) {
		
		res.status(500).json({
      
			message: "An error occurred",
			error
		});
	}
  
}
);
/* POST register users */
router.post("/", async (req, res) => {
	try {
		const data = req.body;
		const response = await registerUser(data);
		res.status(201).json({
			msg: "success, new user created",
			response
		});
	} catch (error) {
		res.status(500).json({
			msg: error
		});
	}
});


/* POST Login users */
router.post("/login", async (req, res) => {
	try {
		const data = req.body;
		const response = await loginUser(data);
		res.status(200).json({
			msg: "User successfully logged in",
			response
		});
	} catch (error) {
		res.status(500).json({ msg: error });
	}
});

/* POST update user */
router.patch("/:id", async (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		const response = await updateUser(data, Number(id));
		res.status(200).json({
			msg: "success, user updated",
			response
		});
	} catch (error) {
		res.status(500).json({
			msg: error
		});
	}

});

/*POST forgot password */
router.post("/forgotpassword", async (req, res) => {
	try {
		const data = req.body;
		const response = await forgotPassword(data);
		res.status(201).json({
			message: "Check your email to reset your password",
			response})
	}catch(error) {
		res.status(500).json({msg: error})
	}
});

router.get("/resetpassword/:token", (req, res) => {
	const token = req.params.token
	res.send(`<form method="POST" action="/api/users/resetpassword">
		<input type="hidden" value=${token} name="token">
		<input type="password" name="password" placeholder="Enter new password"/>
		<input type="submit" name="submit" value="Change password" />
		</form>
	`)
});

router.post("/resetpassword", async (req, res) => {
	const token = req.body.token
	const newPassword: string = req.body.password
	try {
		await resetPassword(token, newPassword)
		res.status(200).json({message: "Password Reset successful"})
	} catch (error) {
		res.status(500).json(error)
	}
})


export default router;
