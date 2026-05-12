import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";
import { useState } from "react";

const WorkerTracking = () => {
  const [tracking, setTracking] = useState(false);

  const handleTracking = () => {
    setTracking(!tracking);
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
        <h1>Live Tracking</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Share your live location with customer.
        </p>

        {/* TRACKING CARD */}
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            maxWidth: "700px",
          }}
        >
          <h2>Current Work Tracking</h2>

          <p style={{ marginTop: "12px" }}>
            <strong>Service:</strong> Land Cleaning
          </p>

          <p>
            <strong>Customer:</strong> Rama Keerthana
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: tracking
                  ? "#16a34a"
                  : "#dc2626",
                fontWeight: "600",
              }}
            >
              {tracking
                ? "Tracking Enabled"
                : "Tracking Disabled"}
            </span>
          </p>

          <button
            onClick={handleTracking}
            style={{
              marginTop: "25px",
              background: tracking
                ? "#dc2626"
                : "#22c55e",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {tracking
              ? "Stop Tracking"
              : "Start Live Tracking"}
          </button>
        </div>

        {/* MAP */}
        <div
          style={{
            marginTop: "30px",
            background: "white",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#dbeafe",
              color: "#1e3a8a",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Worker Live Map Here 📍
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerTracking;