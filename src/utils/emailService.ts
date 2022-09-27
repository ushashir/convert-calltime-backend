import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

dotenv.config();



export async function emailServices(data: Record<string, unknown>, route: string) {
 
	const {email, id, userName} = data;

	const token = jwt.sign({ user_id: id }, process.env.AUTH_SECRET as string , {expiresIn: "30m"});

	const link = `${process.env.FRONTEND_URL}/${route}/${token}`;

	const emailTemplate = `
<div style="max-width: 700px;text-align: center; text-transform: uppercase;
     margin:auto; border: 10px solid #DE3D6D; padding: 50px 20px; font-size: 110%;">
     <h2 style="color: #03435F;">Welcome to <span style="color : #DE3D6D";>Airtime<span><span style="color:#F5844C;">2CAsh<span></h2>
     <p>Hello ${userName}, Please Follow the link by clicking on the button to verify your email
      </p>
      <div style="text-align:center ;">
        <a href=${link}
       style="background: #03435F; text-decoration: none; color: white;
        padding: 10px 20px; margin: 10px 0;
       display: inline-block;">Click here</a>
      </div>
</div>
`;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		},
	});
	const mailOptions = {
		from: process.env.EMAIL_USER,
		username: userName,
		to: email as string,
		subject: "Airtime to Cash",
		html: emailTemplate

	};

	return transporter.sendMail(mailOptions, (err, info)=> err?err:info.response);
}
