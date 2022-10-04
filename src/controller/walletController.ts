import { updateWalletSchema } from '../utils/validation';
import prisma from "../utils/prismaClient";
import { updateUser } from './userController';

export async function updateWallet(data: Record<string, unknown>) {
	const validData = updateWalletSchema.safeParse(data);
	const email = data.email as string;
	if (!validData.success) {
		throw validData.error;
	}
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})
	if (!user) throw "user record not found";
	const amount = Number(data.amount);
	const newBal = user.wallet + amount * 0.7;
	// const response = User ${email} updated account balance is ${newBal} ;
	const response = await updateUser({ wallet: newBal})
    
	return response;

}

