import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    color: String,
    Gender: String,
    photo: String,
    lastLoginIP: String,
     lastLoginAt:Date
});

export const User = mongoose.model("User", userSchema);
