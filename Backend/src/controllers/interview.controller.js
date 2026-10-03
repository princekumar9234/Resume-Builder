import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

export async function genInterviewReportController(req, res) {
    /**
     * Use pdf pasre to read pdf texts
     */
  const parser = new PDFParse({
    data: new Uint8Array(req.file.buffer),
  });

  const result = await parser.getText();

  const resumeContent = result.text;
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(200).json({
    message: "interview report generated successfully",
    interviewReport,
  });
}
