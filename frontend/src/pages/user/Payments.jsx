import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const Payments = () => {
  const payments = [
    {
      id: 1,
      service: "Land Cleaning",
      amount: "₹1200",
      status: "Paid",
      date: "2026-05-12",
    },
    {
      id: 2,
      service: "Fencing",
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
        <h1>Payments</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          View your payment history and pending payments.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gap: "20px",
          }}
        >
          {payments.map((payment) => (
            <div
              key={payment.id}
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
                <h3>{payment.service}</h3>
                <p>Date: {payment.date}</p>
                <p>Amount: {payment.amount}</p>
              </div>

              <button
                style={{
                  background:
                    payment.status === "Paid"
                      ? "#dcfce7"
                      : "#22c55e",
                  color:
                    payment.status === "Paid"
                      ? "#166534"
                      : "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor:
                    payment.status === "Paid"
                      ? "default"
                      : "pointer",
                }}
              >
                {payment.status === "Paid" ? "Paid" : "Pay Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Payments;