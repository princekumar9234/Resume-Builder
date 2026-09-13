import userModel from "../models/user.model.js";
import { generateOTP, getOtpHtml } from "../utils/utils.js";
import { sendEmail } from "../services/email.services.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import otpModel from "../models/otp.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";
import { decode } from "punycode";

export async function userRegister(req, res) {
  const { username, email, password } = req.body;
  try {
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
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function UserLogin(req, res) {
  const { email, password } = req.body;

  try {
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
      refreshTokenHash,
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
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function userLogout(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "RefreshToken not found!" });
  }
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });

  if (!session) {
    return res.status(400).json({ message: "Invalid RefreshToken" });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({ message: "User LogOut Successfully!" });
}

export async function emailVerify(req, res) {
  const { email, otp } = req.body;

  try {
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
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function userGetMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ message: " User not Found!" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function genRefreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRECT);

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid refreshToken",
      });
    }

    const accessToken = jwt.sign(
      {
        id: decoded.id,
      },
      config.JWT_SECRECT,
      {
        expiresIn: "15min",
      },
    );

    const newRefreshToken = jwt.sign(
      {
        id: decoded.id,
      },
      config.JWT_SECRECT,
      {
        expiresIn: "7d",
      },
    );

    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(200).json({ message: "AccessToken is refreshToken" });
    console.log(error);
  }
}
