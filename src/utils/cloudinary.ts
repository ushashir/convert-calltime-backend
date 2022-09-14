import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary

// CLOUDINARY_NAME = surplus-airtime              //for cloudinary
// CLOUDINARY_API_KEY = 661525363926734                //for cloudinary
// CLOUDINARY_API_SECRET = y33as0BMIGjvrHzMnSQG0f9Zgrs