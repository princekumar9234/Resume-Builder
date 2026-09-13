import userModel from "../models/user.model.js";
import { generateOTP, getOtpHtml } from "../utils/utils.js";
import { sendEmail } from "../services/email.services.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import otpModel from "../models/otp.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

export async function userRegister(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email and password are required!" });
  }

  const checkUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (checkUser) {
    if (checkUser.email === email) {
      return res.status(400).json({ message: " Email already exists!" });
    }

    if (checkUser.username === username) {
      return res.status(400).json({ message: "Username already exists!" });
    }
  }

  const hashPassword = await bcrypt.hash(password, 12);

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

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Valid email and password are required!" });
  }
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

  const isValidPassowrd = await bcrypt.compare(password, user.password);

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

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7d
  });

  res.status(200).json({
    message: "Logged in Successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

export async function emailVerify(req, res) {
  const { email, otp } = req.body;

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpDoc = await otpModel.findOne({
    email,
    otpHash,
  });

  if (!otpDoc) {
    return res.status(400).json({ message: "Invalid OTP !" });
  }

  const user = await userModel.findByIdAndUpdate(
    otpDoc.user,
    {
      verified: true,
    },
    { new: true },
  );

  await otpModel.deleteMany({
    user: otpDoc.user,
  });

  return res.status(200).json({
    message: "Email Verified Successfully!",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}
