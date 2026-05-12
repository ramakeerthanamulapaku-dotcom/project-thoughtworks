import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const WorkerEarnings = () => {
  const earnings = [
    {
      id: 1,
      service: "Land Cleaning",
      customer: "Rama Keerthana",
      amount: "₹1200",
      status: "Paid",
      date: "2026-05-12",
    },
    {
      id: 2,
      service: "Fencing",
      customer: "Sai Kumar",
      amount: "₹3500",
      status: "Pending",
      date: "2026-05-15",
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
        <h1>Worker Earnings</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          View your completed work payments and pending earnings.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <SummaryCard title="Total Earnings" value="₹12,500" />
          <SummaryCard title="Pending Amount" value="₹3,500" />
          <SummaryCard title="Completed Jobs" value="8" />
        </div>

        <div
          style={{
            marginTop: "35px",
            display: "grid",
            gap: "20px",
          }}
        >
          {earnings.map((item) => (
            <div
              key={item.id}
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
                <h3>{item.service}</h3>
                <p>Customer: {item.customer}</p>
                <p>Date: {item.date}</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <h3>{item.amount}</h3>
                <p
                  style={{
                    color:
                      item.status === "Paid"
                        ? "#16a34a"
                        : "#dc2626",
                    fontWeight: "600",
                  }}
                >
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SummaryCard = ({ title, value }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ color: "#22c55e" }}>{value}</h2>
      <p style={{ color: "#64748b" }}>{title}</p>
    </div>
  );
};

export default WorkerEarnings;