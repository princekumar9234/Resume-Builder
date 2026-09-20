import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";


const RegisterPage = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleRegister({ username, email, password });
      navigate("/verifyEmail", { state: { email } });
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to get started with your account.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. alexdoe"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 accent-green-600 cursor-pointer"
              />
            </div>
            <label
              htmlFor="terms"
              className="ml-2 text-xs text-gray-600 cursor-pointer select-none"
            >
              I agree to the
              <span className="font-semibold text-green-600 hover:underline">
                Terms of Service
              </span>
              and
              <span className="font-semibold text-green-600 hover:underline">
                Privacy Policy
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !agreed}
            className="w-full py-2.5 text-white font-medium bg-green-600 hover:bg-green-700 rounded-md transition duration-200 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

      
         
        {/* Footer Link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
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

export default RegisterPage;
