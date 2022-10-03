import { Router } from "express";
import { PayFlutter } from "../controller/flutterwaveController";

const router = Router();

router.post("/", async (req, res) => {
    console.log("Ran here");
  try {
      const response = await PayFlutter();
      res.status(200).json({
          message: "Successful",
          response
      })
      return
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred",
      error,
    });
  }
});


export default router;