import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

/**
 * @description controller to generate interview report based on user self description, resume and  jobDescritpion
 */
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

/** 
 * @description Controller to get interview report by in interviewId.
 * 
*/
export async function genInterviewReportByIdController(req, res) {
  const {interviewId} = req.params;

  const interviewReport = await interviewReportModel.findOne({_id: interviewId, user : req.user.id});

  if(!interviewReport){
     return res.status(404).json({
      message :"Interview report not found."
     })
  }

  return res.status(200).json({
    message:"interview report fetched successfully",
    interviewReport
  })
}

export async function getAllInterViewReport(req,res) {
  const interviewReports = await interviewReportModel.find({user : req.user._id}).sort({createdAt : -1})
  .select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preprationPlan")

  res.status(200).json({
    message : "interview reports fetched successfully",
    interviewReports
  })
}
