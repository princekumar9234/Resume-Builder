import { sign } from "jsonwebtoken";
import mongoose from "mongoose";

//subschema of interviewReportSChema
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "question is required!"],
    },
    intention: {
      type: true,
      required: [true, "intention is required"],
    },
    answer: {
      type: true,
      required: [true, "Answer is required"],
    },
  },
  {
    id: false,
  },
);

/**
 * Behavioral question Schema
 */
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "question is required!"],
    },
    intention: {
      type: true,
      required: [true, "intention is required"],
    },
    answer: {
      type: true,
      required: [true, "Answer is required"],
    },
  },
  {
    id: false,
  },
);

/**
 * SkillGap Schema
 */
const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "severity is required"],
    },
  },
  {
    id: false,
  },
);

/**
 * PreprationPlanSchema
 */

const preprationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "focus is Required"],
  },
  tasks: {
    type: String,
    required: [true, "tsaks is required"],
  },
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },
    resumeTesxt: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preprationPlan: [preprationPlanSchema],
  },
  {
    timestamps: true,
  },
);

const intreviewReportModel = mongoose.model(
  "intreviewReport",
  interviewReportSchema,
);

export default intreviewReportModel;
