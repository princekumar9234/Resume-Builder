import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";

const userRouter = Router();

/**
 * UserRegister POST API localhost:3000/user/register
* @param {string} username - The username of the user.
    * @param {string} email - The email of the user.
    * @param {string} password - The password of the user.  
    * @returns {object} 201 - User registered successfully.
    * @returns {object} 400 - Bad request. Username, email and password are required.
 */
userRouter.post("/register",authLimiter, userController.userRegister);

/**
 * UserLogin POST API  localhost:3000/user/login
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} 200 - User logged in successfully.
 * @returns {object} 404 - User not found.
 * @returns {object} 400 - Invalid password.
 */
userRouter.post("/login",authLimiter, userController.UserLogin);

/**
 * UserLogout POST API  localhost:3000/user/emailVerify
 * @param {string} email - The email of the user.
 * @param {string} otp - The OTP code.
 * @returns {object} 200 - Email verified successfully.
 * @returns {object} 400 - Invalid OTP.
 */

userRouter.post("/emailVerify", authLimiter, userController.emailVerify)

export default userRouter;