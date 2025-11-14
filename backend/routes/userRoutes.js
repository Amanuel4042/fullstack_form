import express from "express";
import { User } from "../models/User.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("photo"), async (req, res) => {
    try {
        const { name, email, password, color, sex } = req.body;

        const photo = req.file ? req.file.filename : null;

        const user = new User({
            name,
            email,
            password,
            color,
            sex,
            photo
        });

        await user.save();

        res.json({ message: "Registration successful!" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

export default router;
