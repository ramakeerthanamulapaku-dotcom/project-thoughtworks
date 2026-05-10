import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const ResetPassword = ({ email, setPage }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/auth/reset-password", {
          email,
          password: values.password,
        });

        alert("Password Reset Success");
        setPage("login");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <button type="submit">Reset</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;