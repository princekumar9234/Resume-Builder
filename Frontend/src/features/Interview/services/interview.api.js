import axios from "axios";

const interviewApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const genInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription || "");
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    const response = await interviewApi.post("/interview/interview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * @description service to get interview report by interviewId.
 */
export const getInterviewByIdReport = async (interviewId) => {
  try {
    const response = await interviewApi.get(`/interview/report/${interviewId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * @description service to get interview reports of logged in user.
 */
export const getAllInterViewReport = async () => {
  try {
    const response = await interviewApi.get("/interview");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * @description service to download generated resume PDF based on interview report.
 */
export const downloadResumePdf = async (interviewReportId) => {
  try {
    const response = await interviewApi.post(
      `/interview/resume/pdf/${interviewReportId}`,
      {},
      { responseType: "blob" }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
