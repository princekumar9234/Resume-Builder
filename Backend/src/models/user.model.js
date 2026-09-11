import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Account already exist in this email"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: [true, "password is unique"],
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
