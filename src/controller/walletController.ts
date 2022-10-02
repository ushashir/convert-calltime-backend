import { updateWalletSchema } from '../utils/validation';
import prisma from "../utils/prismaClient";
import { updateUser } from './userController';

export async function updateWallet(amount: string, id: string) {
	const isAmount = updateWalletSchema.safeParse(amount);
	if (!isAmount.success) {
		throw isAmount.error;
	}
	const record = Number(isAmount.data);

	const user = await prisma.user.findUnique({
		where: {
			id: id
		}
	})
	if (!user) throw "user doesnot exist";

	const newBal = user.wallet + record;

	const response = await updateUser({ wallet: newBal, id })
    
	return response;

}

