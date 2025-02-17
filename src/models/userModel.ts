import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        },
    password:{
        type: String,
        required:[true, "Password is required"],
        trim: true,
        minlength: [6, "Password must be at least 6 characters long"],
    }
})

const user = mongoose.models.users ||mongoose.model("users", userSchema);

export default user;