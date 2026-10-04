import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import { z } from "zod";

const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number().describe("a score between 0 to 100 indicating how well candidate matches the job"),

  technicalQuestion: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview"),
    intention: z.string().describe("How intention of interviewer behind asked this question"),
    answer: z.string().describe("how to answer this question, what points to cover, what approach to take etc.")
  })),

  behavioralQuestion: z.array(z.object({
    question: z.string().describe("The behavioral question can be asked in the interview"),
    intention: z.string().describe("How intention of interviewer behind asked this question"),
    answer: z.string().describe("how to answer this question, what points to cover, what approach to take etc.")
  })),

  skillGap: z.array(z.object({
    skill: z.string().describe("the skill which candidate is lacking"),
    severity: z.enum(["low", "medium", "high"]).describe("the severity of the skill gap")
  })),

  preparationPlan: z.array(z.object({
    day: z.number().describe("the day number in the preparation plan, starting from 1"),
    focus: z.string().describe("main focus of this day"),
    tasks: z.string().describe("tasks to be done on this day")
  }))
});

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const prompt = `Generate an interview report for a candidate with the following details:
  Resume: ${resume} 
  Self Description: ${selfDescription} 
  Job Description: ${jobDescription}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}
