import dotenv from "dotenv";
import prisma from "../utils/prismaClient";
import {emailValidation} from "../utils/validation";
import { emailServices } from "../utils/emailService";
import jwt from "jsonwebtoken";

dotenv.config();

export async function sendEmail(email:Record<string, unknown>) {
   
	const isValidData = emailValidation.safeParse(email);
	if(!isValidData.success) throw isValidData.error;
	const record = isValidData.data.email;

	const userData = await prisma.user.findUnique({where: {email:record}});
	if(!userData) throw userData;

	const response = await emailServices(userData);
    return response;

}

export async function verifyUser(token:string) {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
     const id = decoded as unknown as Record<string, number>;
    const user = await prisma.user.findUnique({where: {id: id.user_id}});
    if(!user) throw "user not found";

    
}