import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    color: String,
    sex: String,
    photo: String
});

export const User = mongoose.model("User", userSchema);
