import { prisma } from "@prisma/client";
import { withdrawBalanceSchema } from "../utils/validation"

export async function withdraw(data: Record<string, unknown>, user_id: string) {
    const validData = withdrawBalanceSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    // const user = await prisma.
    return data

}