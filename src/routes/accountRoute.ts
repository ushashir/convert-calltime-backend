import { Router } from "express";
import { createAccount, getAccounts,removeAccount } from "../controller/accountController";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";

const routes = Router();

routes.post("/", auth, async (req: userRequest, res) => {
  try {
    const data = req.body;
    const { user_id } = req.user;
    const response = await createAccount(data, user_id);
    res.status(201).json({ message: "Success", response });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

routes.get("/", auth, async (req: userRequest, res) => {
  try {
    const {user_id} =req.user
    const response = await getAccounts(user_id);
    res.status(200).json({message: "Success", response})
  } catch (error) {
    res.status(400).json({Error: error})
  }
})

routes.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id
    const response = await removeAccount(id);
    res.status(200).json({message: "Success", response})
  } catch (error) {
    res.status(400).json({Error: error})
  }
})

export default routes;
