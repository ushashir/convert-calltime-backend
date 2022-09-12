import express, { Request, Response, NextFunction} from 'express';
import { sendEmail } from '../controller/emailServices';
const router = express.Router();

router.post('/confirmEmail', sendEmail)

export default router;
