import axios from "axios";

const interviewApi = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})

export const genInterviewReport = async ({jobDescription, selfDescription,resumeFile}) => {
    const formData = new formData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume",resumeFile)

    const response = await interviewApi.post("/interview/interview",formData,{
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return response.data
 }


 /**
  * @description service to get interview report by interviewId.
  */
 export const getInterviewByIdReport = async (interviewId)=> {
    const response = await interviewApi.get(`/report/${interviewId}`)
    return response.data
 } 

 /**
  * 
  * @description service to get interview reports of logged in user.
  */
 export const getAllInterViewReport = async () => {
    const response = await interviewApi.get("/interview")
    return response.data
 }