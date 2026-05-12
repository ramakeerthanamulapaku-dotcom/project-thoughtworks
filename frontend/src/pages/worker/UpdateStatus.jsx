import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";
import { useState } from "react";

const UpdateStatus = () => {
  const [status, setStatus] = useState("Assigned");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Work status updated to: ${status}`);
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          padding: "110px 40px 40px",
          minHeight: "100vh",
          background: "#f8fafc",
          color: "#111827",
        }}
      >
        <h1>Update Work Status</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Update your assigned job progress.
        </p>

        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            maxWidth: "650px",
          }}
        >
          <h2>Current Job</h2>

          <p style={{ marginTop: "12px" }}>
            <strong>Service:</strong> Land Cleaning
          </p>

          <p>
            <strong>Customer:</strong> Rama Keerthana
          </p>

          <p>
            <strong>Location:</strong> Kadapa
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "25px",
              display: "grid",
              gap: "15px",
            }}
          >
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={inputStyle}
            >
              <option value="Assigned">Assigned</option>
              <option value="Accepted">Accepted</option>
              <option value="On The Way">On The Way</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <textarea
              placeholder="Add work update note..."
              rows="4"
              style={inputStyle}
            />

            <button style={buttonStyle}>
              Update Status
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
};

const buttonStyle = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default UpdateStatus;