import express from "express";
import morgan from "morgan";
import ConnectDB from "./config/DataBase.js";
import userRouter from "./routes/user.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import helmet from "helmet";

const app = express();
app.use(helmet());
ConnectDB();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/user", userRouter);

export default app;
