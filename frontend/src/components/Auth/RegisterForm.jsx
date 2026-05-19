import { useState } from "react";
import "./Auth.css";
import API from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const redirectByRole = (role) => {
    if (role === "worker") {
      window.location.href = "/worker-dashboard";
    } else if (role === "user") {
      window.location.href = "/user-dashboard";
    } else if (role === "admin") {
      window.location.href = "/admin-dashboard";
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveUserAndRedirect = (userData) => {
    localStorage.setItem("token", userData.token);

    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );

    redirectByRole(userData.role);
  };

  // NORMAL REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        formData
      );

      console.log("Register Success:", res.data);

      alert("Account Created Successfully");

      saveUserAndRedirect(res.data);
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  // GOOGLE SIGNUP
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post(
        "/auth/google",
        {
          credential: credentialResponse.credential,
          role: formData.role,
        }
      );

      console.log("Google Signup Success:", res.data);

      alert("Google Signup Success");

      saveUserAndRedirect(res.data);
    } catch (error) {
      console.log(error);
      alert("Google Signup Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account 🚀</h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#64748b",
          }}
        >
          Sign up to get started
        </p>

        <form onSubmit={handleRegister} autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="new-email"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
           
          >
            <option value="user">User / Land Owner</option>
            <option value="worker">Worker / Service Provider</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <div className="auth-links">
          <a href="/login">Already have account?</a>
        </div>

        <div style={{ marginTop: "20px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log("Google Signup Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;