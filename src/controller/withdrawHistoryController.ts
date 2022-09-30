import { withdrawBalanceSchema } from "../utils/validation"

export async function withdraw(data: Record<string, unknown>, id: string) {
    const validData = withdrawBalanceSchema.safeParse(data);

    return data

}