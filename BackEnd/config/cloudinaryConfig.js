import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name, // Ensure this matches your .env file
    api_key: process.env.cloud_api_key, // Ensure this matches your .env file
    api_secret: process.env.cloud_password, // Ensure this matches your .env file
});

export default cloudinary;