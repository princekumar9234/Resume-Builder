import mongoose from "mongoose";

/**
 * Subschema of Interview Report Schema
 */
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required!"],
    },

    intention: {
      type: String,
      required: [true, "Intention is required"],
    },

    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  }
);

/**
 * Behavioral Question Schema
 */
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required!"],
    },

    intention: {
      type: String,
      required: [true, "Intention is required"],
    },

    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  }
);

/**
 * Skill Gap Schema
 */
const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  }
);

/**
 * Preparation Plan Schema
 */
const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },

    focus: {
      type: String,
      required: [true, "Focus is required"],
    },

    tasks: {
      type: String,
      required: [true, "Tasks are required"],
    },
  },
  {
    _id: false,
  }
);

/**
 * Interview Report Schema
 */
const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },

    resumeText: {
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

    technicalQuestion: {
      type: [technicalQuestionSchema],
      
    },

    behavioralQuestion: {
      type: [behavioralQuestionSchema],
      
    },

    skillGap: {
      type: [skillGapSchema],
      
    },

    preparationPlan: {
      type: [preparationPlanSchema],
      
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

export default interviewReportModel;