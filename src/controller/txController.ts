import prisma from "../utils/prismaClient";
import { txRecordSchema } from "../utils/validation";

export async function recordTx(txData: Record<string, unknown>, id: string) {
    
    const validData = txRecordSchema.safeParse(txData)
    if (!validData.success) throw validData.error
    const {amount, network, phone} = validData.data
    const amountAfterRates = Number(amount) * 0.7
    const response = await prisma.txRecord.create({
        data: {
            amount: amountAfterRates,
            network,
            phone,
            userId:id
        }
    })
    return response

    
}