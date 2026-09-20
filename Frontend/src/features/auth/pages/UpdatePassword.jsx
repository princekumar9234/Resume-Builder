import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, handleUpdatePassword } = useAuth();

  // Agar login page se state me email aayi hai toh wo use hogi
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match!");
      return;
    }

     await handleUpdatePassword({ email, otp, newPassword });
    setSuccessMsg("Congrulations your password is updated");
    navigate("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the OTP sent to your email and set your new password.
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
            {successMsg} — Redirecting to login...
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Email field */}
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

          {/* OTP field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              required
              className="w-full px-3 py-2 mt-1 tracking-widest text-center text-lg font-semibold border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* New Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Confirm Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Show/Hide Password Toggle */}
          <div className="flex items-center">
            <input
              id="show-password"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor="show-password"
              className="ml-2 block text-xs text-gray-700 cursor-pointer"
            >
              Show passwords
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-white font-medium bg-green-600 hover:bg-green-700 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UpdatePassword;
