import { genInterviewReport,getInterviewByIdReport, getAllInterViewReport } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../Interview.content";

export const userInterview = () => {
    const context = useContext(InterviewContext);
    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report , setReport,reports,setReports} = context;

    
}