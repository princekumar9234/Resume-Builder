import { Router } from "express";
import { userAuth } from "../middleware/userToken.middleware.js";
import * as interviewController from "../controllers/interview.controller.js";
import { upload } from "../middleware/file.middleware.js";
const interviewRoute = Router();

/**
 *  POST/interview/interview 
 * @description generate new interview report on the basic of user selfDescription, reumse and jobDescription
 */
interviewRoute.post("/interview",userAuth,upload.single("resume"),interviewController.genInterviewReportController);

/**
 * @route GET /interview/report/:interviewId
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRoute.get("/report/:interviewId", userAuth, interviewController.genInterviewReportByIdController);

/**
 * @route GET /interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRoute.get("/", userAuth, interviewController.getAllInterViewReport)


export default interviewRoute;