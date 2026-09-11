import mongoose from "mongoose";
import config from "./config.js";
import dns, { setServers } from "dns";

setServers(["8.8.8.8", "8.8.4.4"]);

async function ConnectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DataBase is Connected SuccessFully! ❤️");
  } catch (error) {
    console.log(error);
  }
}

export default ConnectDB;
