import { useState } from "react";
import "./Auth.css";

function OTPVerification() {
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    alert("OTP Verified ✅");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleVerify}>
        <h2>OTP Verification</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default OTPVerification;