import { useState } from "react";
import "./auth.css";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log("Register Success:", res.data);
      alert("Account Created Successfully");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>Create Account 🚀</h2>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#64748b" }}>
          Sign up to get started
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            Register
          </button>

        </form>

        {/* LINKS */}
        <div className="auth-links">
          <a href="/login">Already have account?</a>
        </div>

        {/* GOOGLE SIGNUP */}
        <button
          onClick={handleGoogleSignup}
          style={{
            marginTop: "15px",
            background: "#ffffff",
            color: "#111",
            border: "1px solid #ddd",
          }}
        >
          Sign up with Google
        </button>

      </div>

    </div>
  );
};

export default RegisterForm;