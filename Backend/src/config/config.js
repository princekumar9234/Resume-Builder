import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not found in env");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not found in env");
}

if (!process.env.GOOGLE_USER) {
  throw new Error("GOOGLE_USER is not found in env");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is not found in env");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is not found in env");
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error("GOOGLE_REFRESH_TOKEN is not found in env");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_USER: process.env.GOOGLE_USER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
};

export default config;
