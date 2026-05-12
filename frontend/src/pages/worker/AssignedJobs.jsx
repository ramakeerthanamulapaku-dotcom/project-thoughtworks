import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const AssignedJobs = () => {
  const jobs = [
    {
      id: 1,
      service: "Land Cleaning",
      customer: "Rama Keerthana",
      location: "Kadapa",
      date: "2026-05-15",
      status: "Assigned",
    },
    {
      id: 2,
      service: "Fencing",
      customer: "Sai Kumar",
      location: "Tirupati",
      date: "2026-05-18",
      status: "In Progress",
    },
  ];

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
        <h1>Assigned Jobs</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          View your assigned land maintenance works.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gap: "20px",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{job.service}</h3>
                <p>Customer: {job.customer}</p>
                <p>Location: {job.location}</p>
                <p>Date: {job.date}</p>
              </div>

              <button
                style={{
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                View Job
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AssignedJobs;