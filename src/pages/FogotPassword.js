import { useState } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import API from "../utils/API";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const api = new API();
      const res = await api.postData(api.apiUrl + "/api/auth/forgot-password", { email }, false);
      if (res?.success) {
        setSubmitted(true);
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Error sending email.");
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-1000 p-8 rounded-lg shadow border border-gray-700 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Forgot your password?</h2>
        <p className="text-sm text-gray-400 text-center mb-6">Enter your email to receive a reset link</p>

        {submitted ? (
          <p className="text-green-400 text-center">✅ A reset link has been sent to your email.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="w-full bg-black text-white pl-10 pr-3 py-2 border border-gray-600 rounded-md"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Send reset link
            </button>
          </form>
        )}

        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-indigo-400 hover:underline">← Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
