import { updateWalletSchema } from '../utils/validation';
import prisma from "../utils/prismaClient";

export async function updateWallet(data: Record<string, unknown>) {
    const isValidData = updateWalletSchema.safeParse(data);
    console.log(isValidData);
    
	if (!isValidData.success) {
		throw isValidData.error;
	}
	const record = isValidData.data;
    // let user;
    return record;
	}

