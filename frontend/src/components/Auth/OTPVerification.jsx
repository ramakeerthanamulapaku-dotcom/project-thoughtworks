import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const OtpVerify = ({ email, setPage }) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/auth/verify-otp", {
          email,
          otp: values.otp,
        });

        setPage("reset");
        alert("OTP verified");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Verify OTP</h2>

        <form onSubmit={formik.handleSubmit}>
          <input
            name="otp"
            placeholder="Enter OTP"
            onChange={formik.handleChange}
            value={formik.values.otp}
          />

          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;