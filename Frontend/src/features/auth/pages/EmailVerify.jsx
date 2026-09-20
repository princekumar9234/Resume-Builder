import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { emailVerify } from "../services/auth.api";

const EmailVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Agar register page se email pass kiya hai toh wo le lo, warna blank
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
        }, 2000);
      } else {
        setError("Verification failed. Please check your OTP and try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Aapke email par bheja gaya OTP enter karein.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">
            {successMsg} - Login page par redirect ho rahe hain...
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-3 py-2 mt-1 tracking-widest text-center text-lg border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-white font-medium bg-green-600 hover:bg-green-700 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already verified?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-600 hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EmailVerify;
