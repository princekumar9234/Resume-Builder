import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const userRouter = Router();

// userRouter.post("/")
userRouter.post("/register", userController.userRegister);

userRouter.post("/login", userController.UserLogin);


userRouter.post("/emailVerify", userController.emailVerify)

export default userRouter;