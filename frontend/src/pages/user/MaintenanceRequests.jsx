import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const MaintenanceRequests = () => {
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
        <h1>Maintenance Requests</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Raise and track your land maintenance issues.
        </p>

        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Create Request</h2>

          <form style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Land location"
              style={inputStyle}
            />

            <select style={inputStyle}>
              <option>Select Issue Type</option>
              <option>Watering Issue</option>
              <option>Cleaning Required</option>
              <option>Fence Damage</option>
              <option>Pest Problem</option>
              <option>Soil Problem</option>
            </select>

            <textarea
              placeholder="Describe your issue"
              rows="5"
              style={inputStyle}
            />

            <button style={buttonStyle}>
              Submit Request
            </button>
          </form>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h2>Previous Requests</h2>

          <div style={{ marginTop: "15px", display: "grid", gap: "15px" }}>
            <RequestCard title="Fence Damage" status="Pending" />
            <RequestCard title="Watering Issue" status="Resolved" />
          </div>
        </div>
      </div>
    </>
  );
};

const RequestCard = ({ title, status }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <strong>{title}</strong>
      <span>{status}</span>
    </div>
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

export default MaintenanceRequests;