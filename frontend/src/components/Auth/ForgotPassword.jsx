import { useState } from "react";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("OTP sent to email 📩");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;