import userModel from "../models/user.model.js";
import { generateOTP, getOtpHtml } from "../utils/utils.js";
import { sendEmail } from "../services/email.services.js";
import crypto from "crypto";
import otpModel from "../models/otp.model.js";

export async function userRegister(req, res) {
  const { username, email, password } = req.body;

  const checkUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (checkUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  const otp = generateOTP();
  const html = getOtpHtml(otp);

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  await otpModel.create({
    email,
    user: user._id,
    otpHash,
  });

  await sendEmail(email, "Your OTP code", `Your OTP code is ${otp}`, html);

  res.status(201).json({
    message:
      "User Registered Successfully! Please check your email for the OTP.",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}
