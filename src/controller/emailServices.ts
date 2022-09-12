import express, { Request, Response , NextFunction} from 'express';
import nodemailer from "nodemailer"
import "dotenv/config"

export async function sendEmail(req: express.Request | unknown, res: express.Response) {
    const password = process.env.EMAIL_PASS as string 
    // const { email, name, message } = req.body;
   try{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'pod.b.decagon@gmail.com',
            pass: password
        }
    });
    const mailOptions = {
        from: 'pod.b.decagon@gmail.com',
        to: 'ayodejisoyebo@gmail.com',
        subject: "User Verification",
        text: "Please confirm your email",
        // html: `<p>${message}</p>`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.status(400).json({
            message: "An error occurred",
            err
        })
        } else {
            res.status(200).json({
            message: "Email sent successfully",
            info
        })
        }
    }
    );
    res.send("Email sent");
   } catch(err){
       res.status(500).json({
              message: 'failed to send email',
              route: "/confirmEmail"
       })
   }
}