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

if (!process.env.GOOGLE_CLIENT_SECRECT) {
  throw new Error("GOOGLE_CLIENT_SECRECT is not found in env");
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error("GOOGLE_REFRESH_TOKEN is not found in env");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not found in env");
}

if(!process.env.NODE_ENV) {
throw new Error("NODE_ENV is not found in env");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_USER: process.env.GOOGLE_USER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRECT: process.env.GOOGLE_CLIENT_SECRECT,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  JWT_SECRECT: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
