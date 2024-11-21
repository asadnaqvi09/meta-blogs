import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { User } from "../models/userModel.js";
dotenv.config();
const createTokenAndSaveCookies = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        httpOnly: true, // Temporarily set to false for testing
        secure: false,
        sameSite: "lax",
        path: "/", // Ensure the cookie is available throughout the site
    });
    await User.findByIdAndUpdate(userId, { token });
    return token;
};

export default createTokenAndSaveCookies;