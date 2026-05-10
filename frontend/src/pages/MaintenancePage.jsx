import { useState } from "react";

const MaintenancePage = () => {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("Maintenance request submitted successfully.");
    setIssue("");
  };

  return (
    <div className="page">
      <h2>Maintenance Request</h2>
      <form className="form" onSubmit={submitHandler}>
        <textarea
          placeholder="Describe your issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <button type="submit">Submit Request</button>
      </form>
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default MaintenancePage;