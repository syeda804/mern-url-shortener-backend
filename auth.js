
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { upload } from "./config/multer.js";
import cloudinary from "./config/cloudinary.js";

const router = express.Router();

// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: ""
    }
});

const User = mongoose.model("User", userSchema);


// SIGN UP
router.post(
    "/signup",
    upload.single("profilePicture"),
    async (req, res) => {
        try {
            console.log("SIGNUP REQUEST RECEIVED");

            console.log(
                "FILE:",
                req.file ? req.file.originalname : "No image"
            );

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            const existingUser = await User.findOne({
                email: email.trim().toLowerCase()
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            // Default profile picture
            let profilePictureUrl = "";

            // Upload image to Cloudinary
            if (req.file) {
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        {
                            folder: "user-profiles",
                            resource_type: "image"
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    ).end(req.file.buffer);
                });

                profilePictureUrl = result.secure_url;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = new User({
                name,
                email: email.trim().toLowerCase(),
                password: hashedPassword,
                profilePicture: profilePictureUrl
            });

            // Save user
            await user.save();

            console.log("SIGNUP SUCCESS:", user.email);

            return res.status(201).json({
                message: "Signup successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture
                }
            });

        } catch (error) {
            console.error("SIGNUP ERROR:", error.message);

            return res.status(500).json({
                message: "Signup failed",
                error: error.message
            });
        }
    }
);


// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        console.log("SIGNIN REQUEST RECEIVED");

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in .env");
        }

        // Generate token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        console.log("SIGNIN SUCCESS:", user.email);

        return res.status(200).json({
            message: "Signin successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            },

            token: token
        });

    } catch (error) {
        console.error("SIGNIN ERROR:", error.message);

        return res.status(500).json({
            message: "Signin failed",
            error: error.message
        });
    }
});

export default router;
