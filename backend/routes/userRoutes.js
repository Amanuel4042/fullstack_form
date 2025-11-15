import express from "express";
import { User } from "../models/User.js";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, password, color, Gender } = req.body;

    const photo = req.file ? req.file.filename : null;

    const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const user = new User({
      name,
      email,
      password,
      color,
      Gender,
      photo,
      lastLoginIP: userIp,
      lastLoginAt: new Date()
    });

    await user.save();

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "my-gmail@gmail.com",
        pass: "mypassword"
      }
    });

    const mailOption = {
      from: "mygmail@gmail.com",
      to: "mygmial@gmail.com",
      subject: "New Form Submission",
      html: `
        <h2>New Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Color:</strong> ${color}</p>
        <p><strong>Gender:</strong> ${Gender}</p>
        ${photo ? `<p><strong>Photo:</strong> ${photo}</p>` : ""}
      `
    };

    await transporter.sendMail(mailOption);

    res.json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

export default router;
