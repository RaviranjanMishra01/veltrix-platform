import { useNavigate } from "react-router-dom"; // or your routing solution
import { forgotPassword } from "../APIS/authApi";
import { useState } from "react";
// import "./ComponentsCss/ForgotPassword.css";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!userEmail.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!isValidEmail(userEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await forgotPassword(userEmail);

      setSuccess(res.message || "Password reset link sent to your email");
      setUserEmail("");

      // Optional: Redirect after success
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Password reset failed. Please try again.";

      setError(errorMessage);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        {/* Icon */}
        <div className="forgot-password-icon">🔐</div>

        {/* Title */}
        <h1 className="forgot-password-title">Reset Password</h1>

        {/* Description */}
        <p className="forgot-password-description">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Success Message */}
        {success && <div className="success-message">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          {/* Email Field */}
          <div className="form-group">
            <span className="form-group-icon">✉</span>
            <input
              type="email"
              placeholder="Email Address"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
                if (error) setError("");
              }}
              required
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`reset-btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login Link */}
        <a href="/login" className="back-to-login">
          ← Back to Login
        </a>
      </div>
    </div>
  );
}

export default ForgotPassword;