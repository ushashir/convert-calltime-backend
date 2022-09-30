import { createAccountSchema } from "../utils/validation";
import prisma from "../utils/prismaClient";

export async function createAccount(
	data: Record<string, unknown>,
	userId: string
) {
	const validData = createAccountSchema.safeParse(data);
	if (!validData.success) throw validData.error;
	const record = validData.data;
	// check for existing account number
	const existingNumber = await prisma.account.findFirst({
		where: { accountNumber: record.accountNumber },
	});
	if (existingNumber) throw "Account Number already exist";

	const response = await prisma.account.create({
		data: {
			bankName: record.bankName,
			accountName: record.accountName,
			accountNumber: record.accountNumber,
			wallet: record.wallet,
			userId: userId,
		},
	});

	return response;
}

export async function getAccounts(id:string) {
	const userAccount = await prisma.account.findMany({
		where:{
			userId: id
		}
	})

	return userAccount
}

export async function removeAccount(id:string) {
	const response = await prisma.account.delete({where:{id:id}})
}