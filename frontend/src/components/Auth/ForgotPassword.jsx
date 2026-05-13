import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const ForgotPassword = ({ setPage, setEmail }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/auth/send-otp", values);

        setEmail(values.email);
        setPage("otp");

        alert("OTP sent to email");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>

        <form onSubmit={formik.handleSubmit}>
          <input
            name="email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <button type="submit">Send OTP</button>
        </form>

        <p onClick={() => setPage("login")} style={{ cursor: "pointer" }}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;