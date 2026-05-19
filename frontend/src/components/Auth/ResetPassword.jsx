import React from "react";
import { useFormik } from "formik";
import API from "../../services/api";

const ResetPassword = ({ email, setPage }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await API.post("/auth/reset-password", {
          email,
          password: values.password,
        });

        alert("Password Reset Success");
        setPage("login");
      } 
      catch (err) {

  console.log(err);

  alert(
    err.response?.data?.message ||

    "Password reset failed"
  );
}
      
}
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
            minLength="6"
            required
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