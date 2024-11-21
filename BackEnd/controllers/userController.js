import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cloudinary from '../config/cloudinaryConfig.js'; // Adjust the path as necessary
import createTokenAndSaveCookies from '../jwt/authToken.js'
//Register a User
export const register = async (req, res) => {
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).json({ message: "No File Uploaded" });
    }
    const { photo } = req.files;
    console.log("Uploaded photo mimetype:", photo.mimetype); // Log the mimetype for debugging
    const allowedFormats = ["image/jpeg", "image/webp", "image/png"]; // Corrected MIME types
    if (!allowedFormats.includes(photo.mimetype)) {
        return res.status(400).json({
            message: "Invalid photo format. Only jpg and png are allowed",
        });
    }
    const { email, name, password, role, phone, education } = req.body;
    if (!email || !password || !name || !role || !photo || !phone || !education) {
        return res.status(400).json({ message: "Please fill required Fields" })
    }
    if (role === "admin" && email !== "nasad8569@gmail.com") { // Replace with your actual email
        return res.status(400).json({ message: "Only the developer can have admin role" });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res
            .status(400)
            .json({ message: "User Already Exists" })
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log(cloudinaryResponse.error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        name,
        password: hashedPassword, // Ensure you hash the password
        role,
        phone,
        education,
        photo: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url // Make sure to use `secure_url` from Cloudinary
        }
    });
    await newUser.save();
    if (newUser) {
        let token = await createTokenAndSaveCookies(newUser._id, res);
        console.log("Singup: ", token);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60, // 1 hour
            path: '/'  // Ensure the path is the same as the one used in logout
        });
        return res.status(201).json({ message: "User Created Succesfully", newUser })
    }
};

// Login
export const login = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user || user.name !== name) { // Check if user exists and name matches
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login Cookie : ", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token: token,
    });
};


//logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        console.log("User Logged Out");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//get admin
export const getAdmin = async (req, res) => {
    // Ensure only the developer can access this route
    const { email } = req.body;

    if (email !== "nasad8569@gmail.com") {
        // Replace with your actual email
        console.log("Received email:", email);
        return res.status(403).json({ message: "Access denied" });
    }
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
}
