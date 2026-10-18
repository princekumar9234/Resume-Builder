import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase,
  FileText,
  User,
  Upload,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
  Sparkles,
  Bot,
  BrainCircuit,
  Lightbulb,
} from "lucide-react";
import { useInterview } from "../hooks/Interview.hook";
import { useAuth } from "../../auth/hooks/useAuth";

const LOADING_STEPS = [
  "Parsing and extracting resume content...",
  "Analyzing job requirements & tech stack...",
  "Formulating targeted technical & behavioral questions...",
  "Identifying skill gaps & building 5-day prep plan...",
  "Finalizing your personalized interview report...",
];

const INTERVIEW_TIPS = [
  "Structure behavioral answers using the STAR method (Situation, Task, Action, Result).",
  "Focus on quantifiable impact from past projects (e.g. improved speed by 35%).",
  "Prepare 2-3 thoughtful questions to ask your interviewer at the end.",
  "Clarify edge cases before jumping directly into technical coding problems.",
];

const HomePage = () => {
  const navigate = useNavigate();
  const { loading, handleGenReport } = useInterview();
  const { user, handleLogout } = useAuth();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const fileInputRef = useRef(null);

  // Rotate loading steps and tips smoothly while generating
  useEffect(() => {
    let stepTimer;
    let tipTimer;
    if (loading) {
      setCurrentStepIndex(0);
      stepTimer = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2600);

      tipTimer = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % INTERVIEW_TIPS.length);
      }, 4000);
    }
    return () => {
      clearInterval(stepTimer);
      clearInterval(tipTimer);
    };
  }, [loading]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5 MB. Please select a smaller file.");
        return;
      }
      setError("");
      setResumeFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5 MB. Please select a smaller file.");
        return;
      }
      setError("");
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!jobDescription.trim()) {
      setError("Please paste a job description.");
      return;
    }

    if (!resumeFile) {
      setError("Please upload your resume (PDF or Word, up to 5 MB).");
      return;
    }

    try {
      const data = await handleGenReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (data?.interviewReport?._id) {
        navigate(`/interview/${data.interviewReport._id}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err?.message ||
          "Failed to generate interview report. Please try again."
      );
    }
  };


  return (
    <div className="min-h-screen bg-[#faf8f5] text-neutral-900 pb-16">
      {/* Top Navbar */}
      <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#b91032] flex items-center justify-center text-white font-bold">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight">InterviewAI</span>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm font-medium text-neutral-600 hidden sm:inline">
                {user.username || user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition cursor-pointer"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Header Label & Title */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[2.5px] bg-[#b91032] inline-block rounded-full"></span>
            <span className="text-xs font-bold tracking-wider text-[#b91032] uppercase">
              INTERVIEW PREP
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-neutral-900 tracking-tight leading-tight">
            Generate your interview report
          </h1>

          <p className="mt-2.5 text-neutral-600 text-sm sm:text-base leading-relaxed">
            Paste the job description, upload your resume and tell us a little about yourself.
            <br className="hidden sm:inline" />
            {" "}We'll turn it into a focused interview report.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left Column: Job Description */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#b91032]">
                    <Briefcase size={18} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                    Job description
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 mb-4">
                  Paste the full posting: responsibilities, requirements and tech stack.
                </p>
              </div>

              <div className="flex-1 flex flex-col">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="e.g. We're looking for a Frontend Developer with 2+ years of React experience..."
                  rows={13}
                  className="w-full flex-1 min-h-[300px] p-4 text-sm text-neutral-800 placeholder-neutral-400 bg-white border border-neutral-200 rounded-xl resize-none outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition leading-relaxed"
                />
                <div className="mt-2 text-xs text-neutral-400">
                  {jobDescription.length} characters
                </div>
              </div>
            </div>

            {/* Right Column: Resume & About you */}
            <div className="flex flex-col gap-6 justify-between">
              {/* Resume Card */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#b91032]">
                    <FileText size={18} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                    Resume
                  </h2>
                </div>

                {/* Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-neutral-200 hover:border-rose-300 rounded-xl p-6 sm:p-7 text-center cursor-pointer transition bg-neutral-50/50 hover:bg-rose-50/20 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={22} />
                      </div>
                      <p className="text-sm font-semibold text-neutral-800 truncate max-w-[260px]">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-[#b91032] mb-2 group-hover:-translate-y-0.5 transition-transform">
                        <Upload size={22} />
                      </div>
                      <p className="text-sm font-bold text-neutral-900">
                        Click to upload your resume
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        PDF or Word, up to 5 MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* About you Card */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#b91032]">
                    <User size={18} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                    About you
                  </h2>
                </div>

                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Your strengths, projects you're proud of, what you want from this role..."
                  rows={5}
                  className="w-full min-h-[120px] p-4 text-sm text-neutral-800 placeholder-neutral-400 bg-white border border-neutral-200 rounded-xl resize-none outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition leading-relaxed"
                />
                <div className="mt-2 text-xs text-neutral-400">
                  {selfDescription.length} characters
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 px-6 bg-[#b91032] hover:bg-[#a10d2b] active:scale-[0.99] text-white font-semibold text-base rounded-2xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating interview report with AI...</span>
              </>
            ) : (
              <>
                <span>Generate interview report</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </main>

      {/* Premium AI Generation Loading Modal */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-neutral-200 p-7 sm:p-9 max-w-lg w-full shadow-2xl relative overflow-hidden text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-[#b91032] to-amber-500"></div>

            {/* Glowing Icon */}
            <div className="relative w-18 h-18 mx-auto mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-rose-100 animate-ping opacity-60"></div>
              <div className="relative w-18 h-18 rounded-3xl bg-gradient-to-tr from-[#990d29] to-[#b91032] flex items-center justify-center text-white shadow-xl shadow-rose-900/30">
                <BrainCircuit size={34} className="animate-pulse" />
              </div>
            </div>

            {/* Title & Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#b91032] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={14} />
              <span>AI Engine In Progress</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              Generating your interview report
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
              Please wait while Gemini AI analyzes your background and builds a customized interview strategy.
            </p>

            {/* Active Step Indicator */}
            <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-left">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-[#b91032] animate-spin shrink-0" />
                <span className="text-sm font-bold text-neutral-800 transition-all duration-300">
                  {LOADING_STEPS[currentStepIndex]}
                </span>
              </div>

              {/* Progress steps bar */}
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-neutral-200/60">
                {LOADING_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentStepIndex
                        ? "w-8 bg-[#b91032]"
                        : idx < currentStepIndex
                        ? "w-3 bg-emerald-500"
                        : "w-3 bg-neutral-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Helpful tip box */}
            <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5 text-left text-xs text-amber-900">
              <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-amber-950 mb-0.5">Quick Interview Tip:</span>
                <span className="leading-relaxed">{INTERVIEW_TIPS[currentTipIndex]}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

