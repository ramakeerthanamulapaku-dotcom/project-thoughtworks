import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const MyBookings = () => {
  const bookings = [
    {
      id: 1,
      service: "Land Cleaning",
      worker: "Not Assigned",
      date: "2026-05-15",
      status: "Pending",
    },
    {
      id: 2,
      service: "Fencing",
      worker: "Ravi Kumar",
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
        <h1>My Bookings</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Track your booked land maintenance services.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gap: "20px",
          }}
        >
          {bookings.map((booking) => (
            <div
              key={booking.id}
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
                <h3>{booking.service}</h3>
                <p>Worker: {booking.worker}</p>
                <p>Date: {booking.date}</p>
              </div>

              <span
                style={{
                  padding: "8px 14px",
                  borderRadius: "20px",
                  background:
                    booking.status === "Pending"
                      ? "#fef3c7"
                      : "#dcfce7",
                  color:
                    booking.status === "Pending"
                      ? "#92400e"
                      : "#166534",
                  fontWeight: "600",
                }}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBookings;