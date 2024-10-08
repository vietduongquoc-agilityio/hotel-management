import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setErrors(errors);
    setIsFormValid(isFormValid);
  }, [name, email, password, confirmPassword]);

  const handleChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleClick = () => {
    console.log("submit");
  };

  return (
    <div className="form-container">
      <form className="register-form" onClick={handleClick}>
        <div className="wrap-register-form-title">
          <h1 className="register-form-title">Registration</h1>
          <p className="register-form-ders">For Both Staff & Students</p>
        </div>
        <div className="wrap-input-group">
        <label>
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            required={true}
            placeholder="Username"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            required={true}
            placeholder="Username@mail.com"
          />
        </label>
        <label>
          Password
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            required={true}
            placeholder="Password"
          />
        </label>
        <label>
          Confirm Password
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            required={true}
            placeholder="Confirm Password"
          />
        </label>
        </div>
        <div className="actions-register">
          <button className="submit-btn" type="submit" color="btn-primary">
            click
          </button>
          <div className="wrap-link-register">
            <span className="text-register">Already a User?</span>
            <span className="link-register" onClick={handleLoginClick}>
              Login Now
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
