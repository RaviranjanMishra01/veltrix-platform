import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../APIS/authApi";
import "./AuthPage.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register Form State
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setLoginData({ ...loginData, email: rememberedEmail });
      setRememberMe(true);
    }
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Login Form Handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (error) setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(loginData);
      console.log(res);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", loginData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      setSuccess("Login Successful! Redirecting...");
      setTimeout(() => {
        // Navigate to dashboard or home
        window.location.href = "/dashboard";
      }, 1500);

      setLoginData({ email: "", password: "" });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Register Form Handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    if (error) setError("");
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });

      console.log(res);
      setSuccess("Registration Successful! Switching to login...");
      
      setTimeout(() => {
        setIsLogin(true);
        setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
        setLoginData({ email: registerData.email, password: "" });
      }, 1500);

    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Background Elements */}
        <div className="background-gradient gradient-1"></div>
        <div className="background-gradient gradient-2"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="header-icon">
              {isLogin ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M 4 20 Q 4 14 12 14 Q 20 14 20 20" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 12 2 L 15 8 L 22 8 L 17 12 L 19 18 L 12 14 L 5 18 L 7 12 L 2 8 L 9 8 Z" />
                </svg>
              )}
            </div>
            <h1 className="auth-title">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h1>
            <p className="auth-subtitle">
              {isLogin
                ? "Sign in to your account"
                : "Create your account to get started"}
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="message error-message animate-shake">
              <svg viewBox="0 0 24 24">
                <path d="M 12 2 C 6.5 2 2 6.5 2 12 S 6.5 22 12 22 S 22 17.5 22 12 S 17.5 2 12 2 M 12 9 L 15 15 L 9 15 Z" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="message success-message animate-pulse">
              <svg viewBox="0 0 24 24">
                <path d="M 9 16.17 L 4.83 12 L 3.41 13.41 L 9 19 L 21 7 L 19.59 5.59 L 9 16.17 Z" />
              </svg>
              {success}
            </div>
          )}

          {/* Form Container */}
          <div className={`form-container ${isLogin ? "login-active" : "register-active"}`}>
            {/* LOGIN FORM */}
            <form
              onSubmit={handleLoginSubmit}
              className={`auth-form login-form ${isLogin ? "active" : ""}`}
            >
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="login-email" className="form-label">
                  Email Address
                </label>
                <div className="form-input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <div className="form-input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="form-footer">
                <label className="remember-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`auth-button ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* REGISTER FORM */}
            <form
              onSubmit={handleRegisterSubmit}
              className={`auth-form register-form ${!isLogin ? "active" : ""}`}
            >
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="register-name" className="form-label">
                  Full Name
                </label>
                <div className="form-input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    id="register-name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="register-email" className="form-label">
                  Email Address
                </label>
                <div className="form-input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="register-password" className="form-label">
                  Password
                </label>
                <div className="form-input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="register-password"
                    type="password"
                    name="password"
                    placeholder="At least 6 characters"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label htmlFor="register-confirm" className="form-label">
                  Confirm Password
                </label>
                <div className="form-input-wrapper">
                  <span className="input-icon">🔐</span>
                  <input
                    id="register-confirm"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`auth-button ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          {/* Toggle Section */}
          <div className="auth-toggle">
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              className="toggle-button"
              onClick={toggleAuthMode}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="auth-footer">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;