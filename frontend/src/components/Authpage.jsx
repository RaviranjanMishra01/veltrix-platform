"use client";
import { useState, useEffect } from "react";
import "./AuthPage.css";

/* ============================================
   SVG ICONS
   ============================================ */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

/* ============================================
   SHARED: OAUTH BLOCK + DIVIDER
   ============================================ */
const OAuthBlock = () => (
  <>
    <div className="auth-oauth-row">
      <button className="auth-oauth-btn" type="button">
        <GoogleIcon /> Google
      </button>
    </div>
    <div className="auth-divider">
      <div className="auth-divider-line" />
      <span className="auth-divider-text">Or</span>
      <div className="auth-divider-line" />
    </div>
  </>
);

/* ============================================
   SHARED: ALERT MESSAGES
   ============================================ */
const Alerts = ({ error, success }) => (
  <>
    {error && (
      <div className="auth-alert auth-alert-error">
        {" "}
        <span>⚠️</span> {error}{" "}
      </div>
    )}
    {success && (
      <div className="auth-alert auth-alert-success">
        {" "}
        <span>✅</span> {success}{" "}
      </div>
    )}
  </>
);

/* ============================================
   SHARED: FORM FIELD
   ============================================ */
const Field = ({ id, label, icon, children }) => (
  <div className="auth-field">
    <label className="auth-field-label" htmlFor={id}>
      {label}
    </label>
    <div className="auth-field-wrap">
      <div className="auth-field-icon">{icon}</div>
      {children}
    </div>
  </div>
);

/* ============================================
   DYNAMIC LEFT PANEL
   ============================================ */
const AuthPanel = ({ isLogin }) => {
  // Login tab content
  const loginContent = {
    tagline: "Welcome<br />Back!",
    title: "Sign In to Your Account",
    description:
      "Access your listings, messages, saved items, and manage your marketplace activity all in one place.",
    stats: [
      { num: "2.4M+", label: "Active Listings" },
      { num: "850K+", label: "Verified Users" },
      { num: "120+", label: "Categories" },
    ],
    categories: [
      "Electronics",
      "Cars & Bikes",
      "Furniture",
      "Fashion",
      "Real Estate",
    ],
    steps: [
      { label: "Enter your credentials", step: 1 },
      { label: "Verify your account", step: 2 },
      { label: "Access your dashboard", step: 3 },
    ],
  };

  // Register tab content
  const registerContent = {
    tagline: "Start Your<br />Journey!",
    title: "Create Your Account",
    description:
      "Join our community of buyers and sellers. List your products, connect with customers, and grow your business today.",
    stats: [
      { num: "150K+", label: "New Users Monthly" },
      { num: "98%", label: "Seller Rating" },
      { num: "24/7", label: "Customer Support" },
    ],
    categories: [
      " Business",
      " Tech Gadgets",
      " Real Estate",
      " Fashion",
      " Vehicles",
    ],
    steps: [
      { label: "Create your account", step: 1 },
      { label: "Set up your profile", step: 2 },
      { label: "Start buying & selling", step: 3 },
    ],
  };

  const content = isLogin ? loginContent : registerContent;
  const currentStep = 1;

  return (
    <aside className="auth-panel">
      <div className="auth-panel-noise" />

      {/* Brand */}
      <div className="auth-panel-content">
        <div className="auth-brand">
          <span className="auth-brand-dot" />
          MarketHub
        </div>
      </div>

      {/* Hero Section with transition */}
      <div className="auth-panel-hero">
        <div
          className={`auth-panel-tagline ${!isLogin ? "register-mode" : ""}`}
        >
          {content.tagline
            ? content.tagline
                .split("<br />")
                .map((line, i) => (
                  <div key={i}>{i === 1 ? <span>{line}</span> : line}</div>
                ))
            : ""}
        </div>

        <h2 className="auth-panel-title">{content.title}</h2>
        <p className="auth-panel-desc">{content.description}</p>

        <div className="auth-stats-row">
          {content.stats.map((stat, i) => (
            <div className="auth-stat-item" key={i}>
              <div className="auth-stat-num">{stat.num}</div>
              <div className="auth-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="auth-category-pills">
          {content.categories.map((cat, i) => (
            <span
              key={i}
              className={`auth-pill ${i === 0 ? "auth-pill-hot" : ""}`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="auth-steps-panel">
        {content.steps.map(({ label, step }) => {
          const badgeClass =
            step < currentStep
              ? "auth-done"
              : step === currentStep
                ? "auth-current"
                : "auth-pending";
          return (
            <div
              key={step}
              className={`auth-step-item${step === currentStep ? " auth-active" : ""}`}
            >
              <div className={`auth-step-badge ${badgeClass}`}>
                {step < currentStep ? "✓" : step}
              </div>
              <span
                className={`auth-step-text${step === currentStep ? " auth-active-text" : ""}`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

/* ============================================
   LOGIN FORM
   ============================================ */
const LoginForm = ({ onToggle }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  /* Load saved email */
  useEffect(() => {
    const saved = localStorage.getItem("marketplace_remembered_email");
    if (saved) {
      setFormData((d) => ({ ...d, email: saved }));
      setRememberMe(true);
    }
  }, []);

  /* Auto-clear messages */
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      /* 🔌 Replace with: await loginUser(formData); */
      await new Promise((r) => setTimeout(r, 1500));
      if (rememberMe)
        localStorage.setItem("marketplace_remembered_email", formData.email);
      else localStorage.removeItem("marketplace_remembered_email");
      setSuccess("Welcome back! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1600);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-inner">
      <div className="auth-form-header">
        <h1 className="auth-form-title">Sign In</h1>
        <p className="auth-form-subtitle">
          Welcome back! Enter your credentials to access your account.
        </p>
      </div>

      <OAuthBlock />
      <Alerts error={error} success={success} />

      <form onSubmit={handleSubmit} noValidate>
        <Field id="login-email" label="Email" icon="✉">
          <input
            id="login-email"
            className="auth-field-input"
            type="email"
            name="email"
            placeholder="eg. john@gmail.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Field>

        <Field id="login-password" label="Password" icon="🔒">
          <input
            id="login-password"
            className="auth-field-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowPassword((p) => !p)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </Field>

        <div className="auth-form-footer-row">
          <label className="auth-check-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            Remember me
          </label>
          <button type="button" className="auth-forgot-btn">
            Forgot password?
          </button>
        </div>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          <div className="auth-btn-inner">
            {loading ? (
              <>
                <div className="auth-spinner" /> Signing In...
              </>
            ) : (
              "Sign In →"
            )}
          </div>
        </button>

        <div className="auth-toggle-row">
          Don't have an account?{" "}
          <button type="button" className="auth-toggle-link" onClick={onToggle}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

/* ============================================
   REGISTER FORM
   ============================================ */
const RegisterForm = ({ onToggle }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      /* 🔌 Replace with: await registerUser({ firstName, lastName, email, password }); */
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess("Account created! Switching to login...");
      setTimeout(() => {
        onToggle();
      }, 1600);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-inner">
      <div className="auth-form-header">
        <h1 className="auth-form-title">Sign Up Account</h1>
        <p className="auth-form-subtitle">
          Enter your personal data to create your account.
        </p>
      </div>

      <OAuthBlock />
      <Alerts error={error} success={success} />

      <form onSubmit={handleSubmit} noValidate>
        {/* Name row */}
        <div className="auth-name-row">
          <Field id="reg-firstname" label="First Name" icon="👤">
            <input
              id="reg-firstname"
              className="auth-field-input"
              type="text"
              name="firstName"
              placeholder="eg. John"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Field>

          <Field id="reg-lastname" label="Last Name" icon="👤">
            <input
              id="reg-lastname"
              className="auth-field-input"
              type="text"
              name="lastName"
              placeholder="eg. Francisco"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Field>
        </div>

        <Field id="reg-email" label="Email" icon="✉">
          <input
            id="reg-email"
            className="auth-field-input"
            type="email"
            name="email"
            placeholder="eg. johnfrans@gmail.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Field>

        <Field id="reg-password" label="Password" icon="🔒">
          <input
            id="reg-password"
            className="auth-field-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowPassword((p) => !p)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </Field>
        <p className="auth-field-hint">Must be at least 8 characters.</p>

        <Field id="reg-confirm" label="Confirm Password" icon="🔐">
          <input
            id="reg-confirm"
            className="auth-field-input"
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowConfirm((p) => !p)}
            aria-label="Toggle confirm password visibility"
          >
            {showConfirm ? "🙈" : "👁"}
          </button>
        </Field>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          <div className="auth-btn-inner">
            {loading ? (
              <>
                <div className="auth-spinner" /> Creating account...
              </>
            ) : (
              "Sign Up →"
            )}
          </div>
        </button>

        <div className="auth-toggle-row">
          Already have an account?{" "}
          <button type="button" className="auth-toggle-link" onClick={onToggle}>
            Log in
          </button>
        </div>

        <p className="auth-terms">
          By clicking Sign Up, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </form>
    </div>
  );
};

/* ============================================
   ROOT PAGE EXPORT
   ============================================ */
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggle = () => setIsLogin((prev) => !prev);

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page">
        <AuthPanel isLogin={isLogin} />
        <main className="auth-form-side">
          {isLogin ? (
            <LoginForm onToggle={toggle} />
          ) : (
            <RegisterForm onToggle={toggle} />
          )}
        </main>
      </div>
    </div>
  );
}
