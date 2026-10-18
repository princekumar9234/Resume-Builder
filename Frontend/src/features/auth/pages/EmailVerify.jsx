import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { Mail, KeyRound, ArrowRight, Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { emailVerify } from "../services/auth.api";

const EmailVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const data = await emailVerify({ email, otp });
      if (data && data.message) {
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError("Verification failed. Please check your OTP and try again.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-neutral-900 flex flex-col justify-center px-4 sm:px-6 py-10 sm:py-14">
      {/* Top Brand Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#b91032] flex items-center justify-center text-white font-bold shadow-xs">
            <Sparkles size={20} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-neutral-900">
            InterviewAI
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-7 sm:p-9 shadow-xs">
          {/* Header Tag & Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#b91032] inline-block rounded-full"></span>
              <span className="text-xs font-bold tracking-wider text-[#b91032] uppercase">
                SECURITY VERIFICATION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Verify your email
            </h1>
            <p className="mt-1.5 text-sm text-neutral-500">
              Please enter the OTP code sent to your registered email address.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <div className="mb-5 p-3.5 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              <span>{successMsg} Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail size={17} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 bg-white border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition"
                />
              </div>
            </div>

            {/* OTP Code Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                OTP Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <KeyRound size={17} />
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                  className="w-full pl-10 pr-4 py-3 tracking-widest text-center text-base font-bold text-neutral-900 placeholder:font-normal placeholder:tracking-normal placeholder-neutral-400 bg-white border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-5 text-white font-semibold text-sm sm:text-base bg-[#b91032] hover:bg-[#a10d2b] active:scale-[0.99] rounded-2xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying OTP...</span>
                </>
              ) : (
                <>
                  <span>Verify Email</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center text-xs sm:text-sm text-neutral-500">
            Already verified?{" "}
            <Link
              to="/login"
              className="font-bold text-[#b91032] hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;

