import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

/**
 * @description controller to generate interview report based on user self description, resume and jobDescription
 */
export async function genInterviewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const { selfDescription, jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    /**
     * Use pdf parse to read pdf texts
     */
    let resumeContent = "";
    try {
      const parser = new PDFParse({
        data: new Uint8Array(req.file.buffer),
      });
      const result = await parser.getText();
      resumeContent = result.text || "";
    } catch (parseErr) {
      console.log("PDF parse error:", parseErr);
      resumeContent = req.file.buffer.toString("utf-8");
    }

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription: selfDescription || "",
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id || req.user._id,
      resumeText: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    res.status(200).json({
      message: "interview report generated successfully",
      interviewReport,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message || "Failed to generate interview report" });
  }
}

/** 
 * @description Controller to get interview report by in interviewId.
 */
export async function genInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id || req.user._id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    return res.status(200).json({
      message: "interview report fetched successfully",
      interviewReport,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message || "Failed to fetch interview report" });
  }
}

export async function getAllInterViewReport(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id || req.user._id })
      .sort({ createdAt: -1 })
      .select("-resumeText -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan");

    res.status(200).json({
      message: "interview reports fetched successfully",
      interviewReports,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message || "Failed to fetch interview reports" });
  }
}

