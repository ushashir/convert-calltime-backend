import { updateWalletSchema } from '../utils/validation';
import prisma from "../utils/prismaClient";

export async function updateWallet(data: Record<string, unknown>, id: string) {
	const validData = updateWalletSchema.safeParse(data);
	const email = data.email as string;
	if (!validData.success) {
		throw validData.error;
	}
	// validate admin 
	const user = await prisma.user.findFirst({ where: { id } });
	if (!user) {
		throw "Cannot update wallet, owner cannot be verified";
	}
	if (user.isAdmin === true) {
		throw "Access Denied. You are not an admin"
	}

	const confirmMail = await prisma.user.findUnique({
		where: {
			email
		}
	})
	if (!confirmMail) throw "Email not found";
	const amount = Number(data.amount);
	const newBal = confirmMail.wallet + amount * 0.7;

	const response = await prisma.user.update({
		where: {
			email
		},
		data: {
			wallet:
				newBal
		}
	});

	return response; 

}

