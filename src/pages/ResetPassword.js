import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../utils/API";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please check your email.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const api = new API();
      const res = await api.postData(api.apiUrl + "/api/auth/reset-password", {
        token,
        newPassword,
      });

      if (res?.success) {
        setMessage("✅ Your password has been updated.");
      } else {
        setError(res?.message || "An error occurred. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-1000 p-8 rounded-lg shadow border border-gray-700 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Reset Password
        </h2>

        {message ? (
          <p className="text-green-400 text-center">{message}</p>
        ) : (
          <>
            <p className="text-sm text-gray-400 text-center mb-6">
              Enter your new password below
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="text-sm text-gray-300 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full bg-black text-white px-3 py-2 border border-gray-600 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm text-gray-300 block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full bg-black text-white px-3 py-2 border border-gray-600 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                {submitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-indigo-400 hover:underline">
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
