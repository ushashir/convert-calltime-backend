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
    if (!user) throw "User record not found"
    const lastTx = await prisma.txRecord.findMany({
        orderBy: [
            {
                createdAt: 'desc'
            }
        ],
        where:{
            amount: +amount,
            network,
            phone

        }
    })
    if (lastTx.length > 0) {
        let timeDiff = new Date().getTime() - new Date(lastTx[0].createdAt).getTime()
        if(Math.abs(timeDiff) <= 60000) throw "Duplicate transaction, please try again later"
  }
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
     html: `<b>Hello Admin, <br/></b>
            <h3>New transfer record</h3>
            <p>Username: ${user.userName}</p>
            <p>Network: ${network}</p>
            <p>Amount: ${amount}</p>
            <p>Phone No.: ${phone}</p>
            <br/>
            <a href="${process.env.FRONTEND_URL}/admin">Click here</a> to confirm transfer
     `, // html body
  });
    return response
}
