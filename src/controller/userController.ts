import { registerUSerSchema, loginUserSchema, updateUserSchema } from "../utils/validation";
import prisma from "../utils/prismaClient";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import { generateAccessToken } from "../utils/authMiddleware"

export async function registerUser(data: Record<string, unknown>) {
	const validData = registerUSerSchema.safeParse(data);
	if (!validData.success) {
		throw validData.error;
	}
	const record = validData.data;

	if (record.password !== record.confirmPassword) {
		throw "Password and Confirm password didn't match";
	}
	// check for duplicate mail, phone and username
	const duplicateMail = await prisma.user.findFirst({ where: { email: record.email } });
	if (duplicateMail) throw "Email already exist";

	const duplicatePhone = await prisma.user.findFirst({ where: { phone: record.phone } });
	if (duplicatePhone) throw "Phone number already exist";

	const duplicateUserName = await prisma.user.findFirst({ where: { userName: record.userName } });
	if (duplicateUserName) throw "User name already exist";


	return prisma.user.create({
		data: {
			firstName: record.firstName,
			lastName: record.lastName,
			userName: record.userName,
			email: record.email,
			phone: record.phone,
			password: await encryptPassword(record.password) as string
		},
		select: {
			firstName: true,
			lastName: true,
			userName: true,
			email: true,
			phone: true,
			id: true
		}
	});
}

export async function loginUser(data: Record<string, unknown>) {
	//check that information entered by user matches the login schema
	const isValidData = loginUserSchema.safeParse(data);
	if (!isValidData.success) {
		throw isValidData.error
	}
	const record = isValidData.data;

	const user = await prisma.user.findUnique({
		where: {
			email: record.email
		},
	});
	if (!user) {
		throw `No user with ${record.email} found. Please signup`;
	}

	const match = await decryptPassword(record.password, user.password);
	if (!match) {
		throw `Incorrect password. Access denied`;
	}
	return generateAccessToken(user.id as unknown as string);
}

export async function updateUser(data: Record<string, unknown>, id: number) {
	const {
		firstName,
		lastName,
		phone
	} = data

	const validData = updateUserSchema.safeParse(data);
	if (!validData.success) {
		throw validData.error;
	}

	const record = await prisma.user.findFirst({ where: { id } })

	if (!record) {
		throw "Cannot find user"
	}

	return prisma.user.update({
		where: {
			id
		},
		data: {
			firstName: firstName as string,
			lastName: lastName as string,
			phone: phone as string
		},
		select: {
			firstName: true,
			lastName: true,
			phone: true
		}
	});

}
