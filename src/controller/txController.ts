import prisma from "../utils/prismaClient";
import { txRecordSchema } from "../utils/validation";
import nodemailer from "nodemailer"

export async function recordTx(txData: Record<string, unknown>, id: string) {
    
    const validData = txRecordSchema.safeParse(txData)
    if (!validData.success) throw validData.error
    const {amount, network, phone} = validData.data
    const amountAfterRates = Number(amount) * 0.7

    //get user email
    const user = await prisma.user.findUnique({where:{id}})
    if(!user) throw "User record not found"
    const response = await prisma.txRecord.create({
        data: {
            amount: Number(amount),
            amountToReceive: amountAfterRates,
            network,
            phone,
            userId: id,
            email: user?.email
        }
    })

    const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		},
	});

     // send mail with defined transport object
 await transporter.sendMail({
    from: 'Airtime2Cash', // sender address
    to: "erojoseph94@gmail.com", // list of receivers
    subject: "Airtime Transfer Notification", // Subject line
    html: "<b>Hello Admin, <br/> There is a new transaction</b>", // html body
  });
    return response
}
