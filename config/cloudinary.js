import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
    secure: true
});

console.log("Cloudinary Check:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key_loaded: !!process.env.CLOUDINARY_API_KEY,
    api_secret_loaded: !!process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;