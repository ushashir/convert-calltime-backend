import { Router } from "express";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";
import {recordTx} from "../controller/txController"

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

export default route
