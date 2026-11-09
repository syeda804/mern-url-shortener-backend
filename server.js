import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Url from "./models/Url.js";
import authRoutes from "./auth.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });

app.get("/", (req, res) => {
    res.json({
        message: "URL Shortener API Is Running.."
    });
});

app.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const shortUrl = Math.random().toString(36).substring(2, 8);

        const newUrl = new Url({
            originalUrl,
            shortUrl
        });

        await newUrl.save();

        res.json({
            message: "URL Shortened Successfully",
            data: newUrl
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});