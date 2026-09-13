import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import { validateUser } from "../middleware/validation.middleware.js";
import { userAuth } from "../middleware/userToken.middleware.js";

const userRouter = Router();

/**
 * UserRegister POST API localhost:3000/user/register
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} 201 - User registered successfully.
 * @returns {object} 400 - Bad request. Username, email and password are required.
 */
userRouter.post(
  "/register",
  authLimiter,
  validateUser,
  userController.userRegister,
);

/**
 * UserLogin POST API  localhost:3000/user/login
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} 200 - User logged in successfully.
 * @returns {object} 404 - User not found.
 * @returns {object} 400 - Invalid password.
 */
userRouter.post("/login", authLimiter, validateUser, userController.UserLogin);

/**
 *  userLogout GET API localhost:3000/user/logout
 * @description logout for devices
 */
userRouter.get("/logout", authLimiter, validateUser, userController.userLogout);

/**
 * UserLogout POST API  localhost:3000/user/emailVerify
 * @param {string} email - The email of the user.
 * @param {string} otp - The OTP code.
 * @returns {object} 200 - Email verified successfully.
 * @returns {object} 400 - Invalid OTP.
 */
userRouter.post(
  "/emailVerify",
  authLimiter,
  validateUser,
  userController.emailVerify,
);

/**
 * GET/user/get-me
 * @description : - get the current logged in user details
 */
userRouter.get("/get-me", userAuth, userController.userGetMe);

userRouter.get("refreshToken", userController.genRefreshToken);
export default userRouter;
