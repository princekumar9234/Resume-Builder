import express from "express";
import morgan from "morgan";
import ConnectDB from "./config/DataBase.js";
import userRouter from "./routes/user.router.js";

const app = express();
ConnectDB();
app.use(express.json());
app.use(morgan("dev"));
app.use("/user", userRouter);

export default app;
