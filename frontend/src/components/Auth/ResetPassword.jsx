import { useState } from "react";
import "./Auth.css";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    alert("Password Reset Successful 🔥");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;import { useState } from "react";
import "./Auth.css";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    alert("Password Reset Successful 🔥");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;