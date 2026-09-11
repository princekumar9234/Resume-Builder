import userModel from "../models/user.model.js";
import { generateOTP, getOtpHtml } from "../utils/utils.js";
import { sendEmail } from "../services/email.services.js";
import crypto from "crypto";
import otpModel from "../models/otp.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

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

export async function UserLogin(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (!user.verified) {
    return res.status(400).json({
      message:
        "Email not verified! Please verify your email before logging in.",
    });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest(" hex");

  const isValidPassowrd = hashPassword === user.password;

  if (!isValidPassowrd) {
    return res.status(400).json({ message: "Invalid password!" });
  }

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRECT,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshToken: refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    config.JWT_SECRECT,
    {
      expiresIn: "15m",
    },
  );
}
