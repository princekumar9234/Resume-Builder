import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  technicalQuestions :z.array(z.object({
    question :z.string().description("The technical question can be asked in the interview"),
    intention : z.string().description("How intention of intreviewer behind asked this question"),
    answer : z.string().description("how to answer this question, what points to cover, what approach to take etc.")
  })).description("technical questions that can be asked in the interview along with their intention and how to answer them")

  ,behavioralQuestions : z.array(ai.object({
      question :z.string().description("The technical question can be asked in the interview"),
    intention : z.string().description("How intention of intreviewer behind asked this question"),
    answer : z.string().description("how to answer this question, what points to cover, what approach to take etc.")
  })).description("technical questions that can be asked in the interview along with their intention and how to answer them"),

skillGaps : z.array(z.object({
  skill :z.string().description("the skill which candidate is lacking"),
  severity : z.enum(["low", "medium", "high"]).description("the serverity of the top skills gap")
})).description("list of skills gap in the candidate's profile along with their servertiy")
})

async function generateInterviewReport ({resume, selfDescription,jobDescription}){
  
}