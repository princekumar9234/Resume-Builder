import { Router } from "express";
import { userAuth } from "../middleware/userToken.middleware.js";
import * as interviewController from "../controllers/interview.controller.js";
import { upload } from "../middleware/file.middleware.js";
const interviewRoute = Router();

/**
 *  POST/interview/ 
 * @description generate new interview report on the basic of user selfDescription, reumse and jobDescription
 */
interviewRoute.post("/",userAuth,upload.single("resume"),interviewController.genInterviewReportController);

export default interviewRoute;