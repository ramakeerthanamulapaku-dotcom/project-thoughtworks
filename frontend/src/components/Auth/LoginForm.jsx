import { useState } from "react";
import ErrorMessage from "../Common/ErrorMessage";
import "./auth.css";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

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

  // REDIRECT BASED ON ROLE
  const redirectByRole = (role) => {

    if (role === "admin") {

      window.location.href =
        "/admin-dashboard";

    }

    else if (role === "worker") {

      window.location.href =
        "/worker-dashboard";

    }

    else {

      window.location.href =
        "/user-dashboard";

    }
  };

  // SAVE USER
  const saveUserAndRedirect = (
    userData
  ) => {

    localStorage.setItem(
      "token",
      userData.token
    );

    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );

    redirectByRole(
      userData.role
    );

  };

  // NORMAL LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(
        "Login Success:",
        res.data
      );

      alert("Login Successful");

      saveUserAndRedirect(
        res.data
      );

    } catch (err) {

      console.log(err);

      // USER NOT FOUND
      if (
        err.response?.status === 404
      ) {

        setError(
          "Account not found. Please signup first."
        );

        setTimeout(() => {

          window.location.href =
            "/register";

        }, 1500);

      }

      else {

        setError(
          "Invalid email or password"
        );

      }

    }
  };

  // GOOGLE LOGIN
  const handleGoogleSuccess =
    async (credentialResponse) => {

      try {

        const res = await axios.post(
          "http://localhost:5000/api/auth/google",
          {
            credential:
              credentialResponse.credential,
          }
        );

        console.log(res.data);

        alert(
          "Google Login Success"
        );

        saveUserAndRedirect(
          res.data
        );

      } catch (error) {

        console.log(error);

        setError(
          "Google Login Failed"
        );

      }
    };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h2>Welcome Back 👋</h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#64748b",
          }}
        >
          Login to continue
        </p>

        {error && (
          <ErrorMessage
            message={error}
          />
        )}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
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

          <a href="/forgot-password">
            Forgot Password?
          </a>

          <a href="/register">
            Create Account
          </a>

        </div>

        {/* GOOGLE LOGIN */}
        <div
          style={{
            marginTop: "20px",
          }}
        >

          <GoogleLogin
            onSuccess={
              handleGoogleSuccess
            }
            onError={() =>
              setError(
                "Google Login Failed"
              )
            }
          />

        </div>

      </div>

    </div>
  );
};

export default LoginForm;