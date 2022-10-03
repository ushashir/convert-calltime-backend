import { Router } from "express";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";
import {recordTx, userTx} from "../controller/txController"

const route = Router()

route.post('/', auth, async (req:userRequest, res) => {
    try {
        const {user_id} = req.user
        const txData = req.body
        const response = await recordTx(txData, user_id)
        return res.status(201).json({ message: "success", response })
    } catch (error) {
        return res.status(400).json({Error, error})
    }
})

route.get('/', auth, async(req:userRequest, res)=>{
    try {
        const {user_id} = req.user
        const response = await userTx(user_id)
        res.status(200).json({message:"success", response})
    } catch (error) {
        return res.status(400).json({Error, error})
    }
})

export default route
