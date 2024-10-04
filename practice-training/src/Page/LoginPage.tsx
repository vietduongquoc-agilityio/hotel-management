import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    validateFields();
  }, [email, password]);

  const validateFields = () => {
    setIsFormValid(email !== "" && password !== "");
  };

  const handleBlur = () => {
    validateFields();
  };

  const handleChange = (field: string, value: string) => {
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await loginUser(email, password);
      if (response.data) {
        setSuccessMessage("Login successful!");
        navigate("/");
      } else {
        setErrorMessage("Login failed. Please check your login information.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="wrap-login-form-title">
          <h1 className="login-form-title">Welcome Back!</h1>
          <p className="login-form-ders">
            Sign in to continue to your Digital Library
          </p>
        </div>
        <div className="wrap-input-group">
          <label>
            <input
              className="email-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={handleBlur}
              required
              placeholder="Email"
              aria-label="Email"
            />
          </label>
          <label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={handleBlur}
              required
              placeholder="Password"
              aria-label="Password"
            />
          </label>
        </div>
        <div className="actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          {successMessage && (
            <div className="successMessage">
              <p>{successMessage}</p>
            </div>
          )}
          <div className="wrap-link-login">
            <span className="text-login">New User?</span>
            <a className="link-login" href="/login">
              Register Here
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
