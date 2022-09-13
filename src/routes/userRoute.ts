
import { sendEmail, verifyUser } from "../controller/emailServices";
import {Router} from "express";
import {registerUser, loginUser} from "../controller/userController";


const router = Router();

router.get("/verify/:token",async (req, res)=>{
  const token = req.params.token;
  try {
    const response = await verifyUser(token);
    res.status(200).json({message: "user verified", response});
  } catch (error) {
    res.status(400).send(error);
  }
})
router.post("/confirmation", async(req, res) => {
	try {
   
		const response = await sendEmail(req.body);
		res.status(200).json({message: "Email sent successfully", response});
  
	} catch (error) {
		// console.log(error);
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


/* Login users */
router.get("/", async (req, res) => {
	try {
		const data = req.body;
		const response = await loginUser(data);
		res.status(201).json({
			msg: "User successfully logged in",
			response});
	}catch(error) {
		res.status(500).json({msg: error});
	}
});


export default router;
