import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import { Loader2, Sparkles } from "lucide-react";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-4">
        <div className="relative mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#b91032] flex items-center justify-center text-white shadow-lg shadow-rose-900/20 animate-pulse">
            <Sparkles size={28} />
          </div>
          <div className="absolute -inset-1 rounded-2xl border-2 border-[#b91032]/30 animate-ping pointer-events-none"></div>
        </div>
        <div className="flex items-center gap-2 text-neutral-800 font-bold text-lg">
          <Loader2 className="w-4 h-4 animate-spin text-[#b91032]" />
          <span>Loading InterviewAI...</span>
        </div>
        <p className="text-xs text-neutral-500 mt-1 font-medium">
          Verifying your secure session
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;

