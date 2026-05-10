import { useState } from "react";
import ErrorMessage from "../Common/ErrorMessage";
import "./auth.css";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log("Login Success:", res.data);
      alert("Login Successful");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  // Dummy Google login (backend connect later)
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>Welcome Back 👋</h2>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#64748b" }}>
          Login to continue
        </p>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {/* LINKS */}
        <div className="auth-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Create Account</a>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          style={{
            marginTop: "15px",
            background: "#ffffff",
            color: "#111",
            border: "1px solid #ddd",
          }}
        >
          Continue with Google
        </button>

      </div>

    </div>
  );
};

export default LoginForm;