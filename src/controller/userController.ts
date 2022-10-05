import {
	registerUSerSchema,
	loginUserSchema,
	updateUserSchema,
	emailSchema,
} from "../utils/validation";
import prisma from "../utils/prismaClient";
import jwt from "jsonwebtoken";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import cloudinary from "../utils/cloudinary";
import { generateAccessToken } from "../utils/authMiddleware";
import { emailServices } from "../utils/emailService";
import { sendEmail } from "./emailServices";

export async function registerUser(data: Record<string, unknown>) {
	const validData = registerUSerSchema.safeParse(data);
	if (!validData.success) {
		throw validData.error;
	}
	const record = validData.data;

	// check for duplicate mail, phone and username
	const duplicateMail = await prisma.user.findFirst({
		where: { email: record.email },
	});
	if (duplicateMail) throw "Email already exist";

	const duplicatePhone = await prisma.user.findFirst({
		where: { phone: record.phone },
	});
	if (duplicatePhone) throw "Phone number already exist";

	const duplicateUserName = await prisma.user.findFirst({
		where: { userName: record.userName },
	});
	if (duplicateUserName) throw "User name already exist";

	const response = prisma.user.create({
		data: {
			firstName: record.firstName,
			lastName: record.lastName,
			userName: record.userName,
			email: record.email,
      phone: record.phone,
    password: (await encryptPassword(record.password)) as string,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			userName: true,
			email: true,
			phone: true,
			wallet: true
		},
	});
	sendEmail({ email: (await response).email });
	return `Hello ${(await response).firstName
		}, please check your email to confirm ${(await response).email}`;
}

export async function loginUser(data: Record<string, unknown>) {
	const isValidData = loginUserSchema.safeParse(data);

	if (!isValidData.success) {
		throw isValidData.error;
	}
	const record = isValidData.data;

	let user;
	if (record.email) {
		user = await prisma.user.findUnique({ where: { email: record.email } });
	} else if (record.userName) {
		user = await prisma.user.findUnique({
			where: { userName: record.userName },
		});
	}
	if (!user) {
		throw "No user with username/email found. Please signup";
	}

	const match = await decryptPassword(record.password, user.password);

	if (!match) {
		throw "Incorrect password. Access denied";
	}
	const {
		id,
		firstName,
		lastName,
		email,
		userName,
		phone,
		avatar,
		isVerified,
		wallet,
	} = user;
	return {
		token: generateAccessToken(user.id as unknown as string),
		userdata: {
			id,
			firstName,
			lastName,
			userName,
			email,
			phone,
			avatar,
			isVerified,
			wallet
		},

	};
}

export async function updateUser(data: Record<string, unknown>) {
	const validData = updateUserSchema.safeParse(data);
	const id = data.id as string;
	if (!validData.success) {
		throw validData.error;
	}
	const user = await prisma.user.findFirst({ where: { id } });
	if (!user) {
		throw "Cannot find user";
	}

	const avatar = data.avatar as string;

	let uploadedResponse;
	if (avatar) {
		uploadedResponse = await cloudinary.uploader.upload(avatar, {
			allowed_formats: ["jpg", "png", "svg", "jpeg"],
			folder: "live-project"
		});

		if (!uploadedResponse) throw Error;
	}

	const record = validData.data;
	return prisma.user.update({
		where: {
			id,
		},
		data: {
			avatar: uploadedResponse ? uploadedResponse.url : record.avatar,
			firstName: record.firstName,
			lastName: record.lastName,
			userName: record.userName,
			phone: record.phone,
			isVerified: record.isVerified,
			password: record.password
				? ((await encryptPassword(record.password)) as string)
				: (user.password as string),
			wallet: record.wallet as unknown as number
		},
		select: {
			avatar: true,
			firstName: true,
			lastName: true,
			userName: true,
			phone: true,
			wallet: true
		},
	});
}

export async function forgotPassword(data: Record<string, unknown>) {
	const validData = emailSchema.safeParse(data);
	if (!validData.success) throw validData.error;
	const email = validData.data.email;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw "User does not exist";

	const response = emailServices(user, "resetpassword");
	return response;
}

export async function resetPassword(token: string, newPassword: string) {
	const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
	const id = decoded as unknown as Record<string, string>;
	const user = await prisma.user.findUnique({ where: { id: id.user_id } });
	if (!user) throw "user not found";
	await updateUser({ password: newPassword, id: user.id });
}

export async function getById(id: string) {
	return await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			avatar: true,
			firstName: true,
			lastName: true,
			userName: true,
			phone: true,
			email: true,
			wallet: true
		},
	});
}

