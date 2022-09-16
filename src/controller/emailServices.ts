import dotenv from "dotenv";
import prisma from "../utils/prismaClient";
import {emailSchema} from "../utils/validation";
import { emailServices } from "../utils/emailService";
import jwt from "jsonwebtoken";
import { updateUser } from "./userController";

dotenv.config();

export async function sendEmail(email:Record<string, unknown>) {
   
	const isValidData = emailSchema.safeParse(email);
	if(!isValidData.success) throw isValidData.error;
	const record = isValidData.data.email;

	const userData = await prisma.user.findUnique({where: {email:record}});
	if(!userData) throw `user with ${record} does not exist`;

	const response = await emailServices(userData,"verify");
	return response;
}

export async function verifyUser(token:string) {
	const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
	const id = decoded as unknown as Record<string, string>;
	const user = await prisma.user.findUnique({where: {id: id.user_id}});
	if(!user) throw "user not found";
	const response = await updateUser({isVerified:true}, user.id);
	return response;
}