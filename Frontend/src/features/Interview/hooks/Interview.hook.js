import {
  genInterviewReport,
  getInterviewByIdReport,
  getAllInterViewReport,
  downloadResumePdf,
} from "../services/interview.api";
import { useContext, useState } from "react";
import { InterviewContext } from "../Interview.content";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const handleGenReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
      const data = await genInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(data.interviewReport);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetReportById = async (interviewId) => {
    setLoading(true);
    try {
      const data = await getInterviewByIdReport(interviewId);
      setReport(data.interviewReport);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllReports = async () => {
    setLoading(true);
    try {
      const data = await getAllInterViewReport();
      setReports(data.interviewReports || []);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const [downloadingResume, setDownloadingResume] = useState(false);

  const handleDownloadResumePdf = async (interviewReportId) => {
    setDownloadingResume(true);
    try {
      const blobData = await downloadResumePdf(interviewReportId);
      const blob = new Blob([blobData], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `tailored_resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setDownloadingResume(false);
    }
  };

  return {
    loading,
    setLoading,
    downloadingResume,
    report,
    setReport,
    reports,
    setReports,
    handleGenReport,
    handleGetReportById,
    handleGetAllReports,
    handleDownloadResumePdf,
  };
};
