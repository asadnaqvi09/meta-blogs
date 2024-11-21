import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

// Authentication
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Middleware :", token);
        if (!token) {
            return res.status(401).json({ error: "User not Authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }
        req.user = user;
        console.log("User Checking :", req.user);
        next();
    } catch (error) {
        console.log("Error occuring on User Authentication" + error);
        return res.status(401).json({ error: "User not authenticated" });
    }
}
//Authorization
export const isAdmin = (...email) => {
    return (req, res, next) => {
        // Ensure req.user is defined and has an email
        if (!req.user || !req.user.email) {
            return res.status(403).json({ message: "User information is missing" });
        }

        // Check if the user's email is in the list of allowed admin emails
        if (!email.includes(req.user.email)) {
            return res.status(403).json({ message: "You are not allowed to perform this action" });
        }

        next();
    }
}