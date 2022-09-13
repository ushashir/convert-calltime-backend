import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {emailValidation} from "../utils/validation";

dotenv.config();

export async function sendEmail(email:Record<string, unknown>) {
	const password = process.env.EMAIL_PASS as string; 
	const isValid = emailValidation.safeParse(email);
    
	if(!isValid.success) {
		throw isValid.error
	}
    console.log(isValid.data + "  ###");
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "pod.b.decagon@gmail.com",
			pass: password
		}
	});
   
	const mailOptions = {
		from: "pod.b.decagon@gmail.com",
		to:  isValid.data.email,
		subject: "User Verification",
		text: "Please confirm your email",
		// html: `<p>${message}</p>`
	};
	const data = transporter.sendMail(mailOptions,  (err, info)=> {err ? err:info;});
   return(data);
}