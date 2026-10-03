import { Router } from "express";
import { userAuth } from "../middleware/userToken.middleware.js";
import * as intervviewController from "../controllers/interview.controller.js";
const interviewRoute = Router();

/**
 *  POST/interview/ 
 * @description generate new interview report on the basic of user selfDescription, reumse and jobDescription
 */
interviewRoute.post("/",userAuth,intervviewController.genInterviewReportController);

export default interviewRoute;