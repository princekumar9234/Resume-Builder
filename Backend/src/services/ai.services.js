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
    tasks: z.string().describe("list of tasks to be done on this day")
  })).describe("a day-wise preparation plan for the candidate to follow in order to prepare to the interview"),
  tittle: z.string().describe("the tittle of the job for the which the interview report is generates"),
});

const tailoredResumeSchema = z.object({
  fullName: z.string().describe("Candidate's full name"),
  title: z.string().describe("Target job title matching the job description"),
  email: z.string().optional().describe("Email address if found"),
  phone: z.string().optional().describe("Phone number if found"),
  location: z.string().optional().describe("Location or city"),
  summary: z.string().describe("3-4 sentence professional summary tailored to the job"),
  skills: z.array(z.string()).describe("Key technical and professional skills"),
  experience: z.array(
    z.object({
      role: z.string().describe("Job title or role"),
      company: z.string().describe("Company name"),
      period: z.string().optional().describe("Duration e.g. 2022 - Present"),
      highlights: z.array(z.string()).describe("Key achievements or duties"),
    })
  ).describe("Work experience items"),
  projects: z.array(
    z.object({
      name: z.string().describe("Project name"),
      description: z.string().describe("Short project description"),
      highlights: z.array(z.string()).optional().describe("Key outcomes or features"),
    })
  ).optional().describe("Key projects"),
  education: z.array(
    z.object({
      degree: z.string().describe("Degree or qualification"),
      institution: z.string().describe("Institution name"),
      year: z.string().optional().describe("Year of completion"),
    })
  ).optional().describe("Education details"),
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

export async function generateResumePdf({ resume, jobDescription, selfDescription }) {
  let resumeData = null;
  try {
    const prompt = `Generate an ATS-friendly, tailored resume for this candidate targeted specifically for the following job description:
    Candidate Resume: ${resume}
    Candidate Self Description: ${selfDescription}
    Target Job Description: ${jobDescription}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema(tailoredResumeSchema),
      },
    });

    resumeData = JSON.parse(response.text);
  } catch (err) {
    console.log("AI resume tailoring error:", err.message);
  }

  const { default: PDFDocument } = await import("pdfkit");

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 45, size: "A4" });
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (err) => reject(err));

      if (resumeData) {
        // Name & Header
        doc.fontSize(22).font("Helvetica-Bold").fillColor("#111827").text(resumeData.fullName || "Candidate", { align: "left" });
        doc.fontSize(11).font("Helvetica-Bold").fillColor("#b91032").text(resumeData.title || "Professional Profile", { align: "left" });

        const contactParts = [resumeData.email, resumeData.phone, resumeData.location].filter(Boolean);
        if (contactParts.length > 0) {
          doc.fontSize(9).font("Helvetica").fillColor("#6b7280").text(contactParts.join("  •  "), { align: "left" });
        }
        doc.moveDown(0.4);

        // Divider
        doc.strokeColor("#e5e7eb").lineWidth(1).moveTo(45, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.6);

        // Professional Summary
        if (resumeData.summary) {
          doc.fontSize(10).font("Helvetica-Bold").fillColor("#b91032").text("PROFESSIONAL SUMMARY");
          doc.moveDown(0.2);
          doc.fontSize(9).font("Helvetica").fillColor("#374151").text(resumeData.summary, { lineGap: 2 });
          doc.moveDown(0.7);
        }

        // Skills
        if (resumeData.skills && resumeData.skills.length > 0) {
          doc.fontSize(10).font("Helvetica-Bold").fillColor("#b91032").text("CORE SKILLS & TECHNOLOGIES");
          doc.moveDown(0.2);
          doc.fontSize(9).font("Helvetica").fillColor("#374151").text(resumeData.skills.join("  •  "), { lineGap: 2 });
          doc.moveDown(0.7);
        }

        // Experience
        if (resumeData.experience && resumeData.experience.length > 0) {
          doc.fontSize(10).font("Helvetica-Bold").fillColor("#b91032").text("WORK EXPERIENCE");
          doc.moveDown(0.3);
          resumeData.experience.forEach((exp) => {
            doc.fontSize(9.5).font("Helvetica-Bold").fillColor("#111827").text(exp.role || "", { continued: true });
            if (exp.company) {
              doc.font("Helvetica").fillColor("#6b7280").text(`  |  ${exp.company}`, { continued: !!exp.period });
            }
            if (exp.period) {
              doc.font("Helvetica-Oblique").fillColor("#9ca3af").text(`  (${exp.period})`);
            } else {
              doc.text("");
            }
            doc.moveDown(0.2);

            if (exp.highlights && Array.isArray(exp.highlights)) {
              exp.highlights.forEach((h) => {
                doc.fontSize(8.5).font("Helvetica").fillColor("#374151").text(`•  ${h}`, { indent: 10, lineGap: 1.5 });
              });
            }
            doc.moveDown(0.4);
          });
        }

        // Projects
        if (resumeData.projects && resumeData.projects.length > 0) {
          doc.fontSize(10).font("Helvetica-Bold").fillColor("#b91032").text("KEY PROJECTS");
          doc.moveDown(0.3);
          resumeData.projects.forEach((proj) => {
            doc.fontSize(9.5).font("Helvetica-Bold").fillColor("#111827").text(proj.name || "");
            if (proj.description) {
              doc.fontSize(8.5).font("Helvetica").fillColor("#374151").text(proj.description, { indent: 8, lineGap: 1.5 });
            }
            if (proj.highlights && Array.isArray(proj.highlights)) {
              proj.highlights.forEach((ph) => {
                doc.fontSize(8.5).font("Helvetica").fillColor("#4b5563").text(`•  ${ph}`, { indent: 14, lineGap: 1.5 });
              });
            }
            doc.moveDown(0.4);
          });
        }

        // Education
        if (resumeData.education && resumeData.education.length > 0) {
          doc.fontSize(10).font("Helvetica-Bold").fillColor("#b91032").text("EDUCATION");
          doc.moveDown(0.3);
          resumeData.education.forEach((edu) => {
            doc.fontSize(9).font("Helvetica-Bold").fillColor("#111827").text(edu.degree || "", { continued: !!edu.institution });
            if (edu.institution) {
              doc.font("Helvetica").fillColor("#6b7280").text(` — ${edu.institution}`, { continued: !!edu.year });
            }
            if (edu.year) {
              doc.font("Helvetica-Oblique").fillColor("#9ca3af").text(` (${edu.year})`);
            } else {
              doc.text("");
            }
            doc.moveDown(0.2);
          });
        }
      } else {
        // Fallback layout if AI formatting fails
        doc.fontSize(18).font("Helvetica-Bold").fillColor("#111827").text("Tailored Candidate Profile");
        doc.moveDown(0.5);
        if (selfDescription) {
          doc.fontSize(11).font("Helvetica-Bold").fillColor("#b91032").text("SELF DESCRIPTION");
          doc.fontSize(9.5).font("Helvetica").fillColor("#374151").text(selfDescription);
          doc.moveDown();
        }
        if (resume) {
          doc.fontSize(11).font("Helvetica-Bold").fillColor("#b91032").text("RESUME DETAILS");
          doc.fontSize(9.5).font("Helvetica").fillColor("#374151").text(resume);
        }
      }

      doc.end();
    } catch (docErr) {
      reject(docErr);
    }
  });
}

