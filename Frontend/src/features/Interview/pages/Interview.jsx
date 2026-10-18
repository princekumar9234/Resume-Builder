import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  Loader2,
  Target,
  BookOpen,
} from "lucide-react";
import { useInterview } from "../hooks/Interview.hook";

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { loading, report, handleGetReportById } = useInterview();

  const [activeTab, setActiveTab] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (interviewId && (!report || report._id !== interviewId)) {
      handleGetReportById(interviewId).catch((err) => {
        setFetchError(
          err.response?.data?.message || "Failed to load interview report"
        );
      });
    }
  }, [interviewId]);

  const toggleQuestion = (index, type) => {
    const key = `${type}-${index}`;
    setExpandedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading && !report) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-neutral-900 pb-20 animate-pulse">
        {/* Skeleton Top Navbar */}
        <header className="border-b border-neutral-200/60 bg-white/80 h-16 flex items-center justify-between px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="h-4 w-32 bg-neutral-200 rounded-md"></div>
          <div className="h-8 w-24 bg-neutral-200 rounded-lg"></div>
        </header>

        {/* Skeleton Report Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
          {/* Header Summary Card Skeleton */}
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="h-3 w-28 bg-rose-200 rounded-full"></div>
                <div className="h-8 w-64 sm:w-80 bg-neutral-200 rounded-xl"></div>
                <div className="h-4 w-40 bg-neutral-100 rounded-md"></div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-neutral-200 self-start md:self-auto shrink-0"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-neutral-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 bg-neutral-50 rounded-xl space-y-2">
                  <div className="h-6 w-12 mx-auto bg-neutral-200 rounded-md"></div>
                  <div className="h-3 w-20 mx-auto bg-neutral-200 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gaps Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-48 bg-neutral-200 rounded-md"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-white rounded-xl border border-neutral-200/80"></div>
              ))}
            </div>
          </div>

          {/* Questions Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-60 bg-neutral-200 rounded-md"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-neutral-200/80 p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-neutral-200 rounded-md"></div>
                  <div className="h-12 bg-neutral-50 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }


  if (fetchError || (!report && !loading)) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center max-w-md shadow-sm">
          <AlertTriangle className="w-12 h-12 text-[#b91032] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-neutral-900">
            Report Not Found
          </h2>
          <p className="text-sm text-neutral-600 mt-2 mb-6">
            {fetchError || "Could not retrieve the interview report."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b91032] text-white rounded-xl text-sm font-semibold hover:bg-[#a10d2b] transition"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const {
    tittle,
    matchScore = 0,
    technicalQuestion = [],
    behavioralQuestion = [],
    skillGap = [],
    preparationPlan = [],
    createdAt,
  } = report;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-neutral-900 pb-20">
      {/* Top Navbar */}
      <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition"
          >
            <ArrowLeft size={18} />
            <span>Generate Another</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition cursor-pointer"
            >
              <Download size={15} />
              <span>Print / Save</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Report Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Header Summary Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-[#b91032] inline-block rounded-full"></span>
                <span className="text-xs font-bold tracking-wider text-[#b91032] uppercase">
                  INTERVIEW REPORT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
                {tittle || "Interview Preparation"}
              </h1>
              <p className="mt-2 text-neutral-500 text-xs sm:text-sm">
                Generated on{" "}
                {createdAt ? new Date(createdAt).toLocaleDateString() : "Today"}
              </p>
            </div>

            {/* Match Score Gauge */}
            <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-100 self-start md:self-auto">
              <div
                className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-extrabold text-xl shadow-xs ${getScoreColor(
                  matchScore
                )}`}
              >
                <span>{matchScore}%</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Profile Match
                </p>
                <p className="text-sm font-semibold text-neutral-800">
                  {matchScore >= 80
                    ? "Strong Candidate Match"
                    : matchScore >= 60
                    ? "Moderate Candidate Match"
                    : "Growth Opportunity"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-neutral-100">
            <div className="p-3 bg-neutral-50 rounded-xl text-center">
              <span className="block text-xl font-bold text-neutral-900">
                {technicalQuestion.length}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Technical Qs
              </span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl text-center">
              <span className="block text-xl font-bold text-neutral-900">
                {behavioralQuestion.length}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Behavioral Qs
              </span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl text-center">
              <span className="block text-xl font-bold text-neutral-900">
                {skillGap.length}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Identified Gaps
              </span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl text-center">
              <span className="block text-xl font-bold text-neutral-900">
                {preparationPlan.length} Days
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Study Plan
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Skill Gaps */}
        {skillGap.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Target size={20} className="text-[#b91032]" />
              <h2 className="text-xl font-bold text-neutral-900">
                Identified Skill Gaps
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skillGap.map((gap, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-neutral-800">
                    {gap.skill}
                  </span>
                  <span
                    className={`text-xs uppercase font-bold px-2.5 py-1 rounded-full border ${getSeverityBadge(
                      gap.severity
                    )}`}
                  >
                    {gap.severity}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Technical Questions */}
        {technicalQuestion.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={20} className="text-[#b91032]" />
              <h2 className="text-xl font-bold text-neutral-900">
                Technical Questions & Suggested Answers
              </h2>
            </div>

            <div className="space-y-4">
              {technicalQuestion.map((q, index) => {
                const isExpanded = expandedQuestions[`tech-${index}`] ?? true;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => toggleQuestion(index, "tech")}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-neutral-50/60 transition cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-rose-50 text-[#b91032] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <h3 className="text-base font-bold text-neutral-900 leading-snug">
                          {q.question}
                        </h3>
                      </div>
                      <div className="text-neutral-400 mt-1">
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 space-y-3.5 border-t border-neutral-100">
                        {q.intention && (
                          <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-3.5 text-xs text-neutral-700">
                            <span className="font-bold text-[#b91032] block mb-1">
                              Why the interviewer asks this:
                            </span>
                            {q.intention}
                          </div>
                        )}

                        <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-800 leading-relaxed">
                          <span className="font-bold text-neutral-900 block mb-1.5 text-xs uppercase tracking-wider">
                            Recommended Answer Strategy:
                          </span>
                          {q.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 3: Behavioral Questions */}
        {behavioralQuestion.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-[#b91032]" />
              <h2 className="text-xl font-bold text-neutral-900">
                Behavioral Questions
              </h2>
            </div>

            <div className="space-y-4">
              {behavioralQuestion.map((q, index) => {
                const isExpanded = expandedQuestions[`beh-${index}`] ?? true;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => toggleQuestion(index, "beh")}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-neutral-50/60 transition cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <h3 className="text-base font-bold text-neutral-900 leading-snug">
                          {q.question}
                        </h3>
                      </div>
                      <div className="text-neutral-400 mt-1">
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 space-y-3.5 border-t border-neutral-100">
                        {q.intention && (
                          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 text-xs text-neutral-700">
                            <span className="font-bold text-amber-800 block mb-1">
                              Interviewer's Intention:
                            </span>
                            {q.intention}
                          </div>
                        )}

                        <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-800 leading-relaxed">
                          <span className="font-bold text-neutral-900 block mb-1.5 text-xs uppercase tracking-wider">
                            Suggested STAR Framework Response:
                          </span>
                          {q.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 4: Day-Wise Preparation Plan */}
        {preparationPlan.length > 0 && (
          <section className="mt-10 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-[#b91032]" />
              <h2 className="text-xl font-bold text-neutral-900">
                Tailored Day-Wise Preparation Plan
              </h2>
            </div>

            <div className="space-y-4">
              {preparationPlan.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <div className="w-16 h-16 rounded-xl bg-neutral-900 text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">
                      Day
                    </span>
                    <span className="text-xl font-black">{plan.day || index + 1}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-bold text-neutral-900 mb-1">
                      {plan.focus}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                      {plan.tasks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default Interview;

