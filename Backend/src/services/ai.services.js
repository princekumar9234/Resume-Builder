import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number().describe("a score between 0 to 100 indicating how to well the candidate's profile matches the job description")
  
  ,technicalQuestions :z.array(z.object({
    question :z.string().describe("The technical question can be asked in the interview"),
    intention : z.string().describe("How intention of intreviewer behind asked this question"),
    answer : z.string().describe("how to answer this question, what points to cover, what approach to take etc.")
  })).describe("technical questions that can be asked in the interview along with their intention and how to answer them")

  ,behavioralQuestions : z.array(z.object({
      question :z.string().describe("The technical question can be asked in the interview"),
    intention : z.string().describe("How intention of intreviewer behind asked this question"),
    answer : z.string().describe("how to answer this question, what points to cover, what approach to take etc.")
  }))
  .describe("technical questions that can be asked in the interview along with their intention and how to answer them"),

skillGaps : z.array(z.object({

  skill :z.string().describe("the skill which candidate is lacking"),
  severity : z.enum(["low", "medium", "high"]).describe("the serverity of the top skills gap")
}))
.describe("list of skills gap in the candidate's profile along with their servertiy"),

preparationPlan: z.array(z.object({

  day:z.number().describe("the day number in the preparation plan, staring from 1"),
  focus: z.string().describe("the main foucus of this day in the preparation plan, e.g. data structure, system design mock interviews etc"),
  task:z.array().describe("list of the task to be done on this day")
}))
.describe("a day-wise preparation plan for the candidate to follow in order")
})

export async function generateInterviewReport ({resume, selfDescription,jobDescription}){
 
  const prompt = `Generate an interview report for a candiadate with the following deteails
  Resume : ${resume} selfSescrption : ${selfDescription} jobDescription : ${jobDescription}
  `

  const response = await ai.models.generateContent({
    model :"gemini-3-flash-preview",
    contents :prompt,
    config:{
      responseMimeType : "application/json",
      responseJsonSchema :zodToJsonSchema(interviewReportSchema)
    }
  })

  return JSON.parse(response.text);
  
}

