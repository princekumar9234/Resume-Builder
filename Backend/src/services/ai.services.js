import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});



