import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
    required: [true, "username is required"], 
  },
  email: {
    type: String,
    unique: [true, "Account already exist in this email"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    
    
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
