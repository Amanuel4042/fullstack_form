import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongoURL } from "./config.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// routes
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);

// start server
app.listen(5000, () => console.log("Server running on port 5000"));
