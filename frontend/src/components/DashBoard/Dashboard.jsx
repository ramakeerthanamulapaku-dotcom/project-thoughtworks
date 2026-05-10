import "./dashboard.css";

function Dashboard() {

  // DUMMY DATA
  const bookings = [
    {
      id: 1,
      service: "Land Cleaning",
      status: "Completed",
    },
    {
      id: 2,
      service: "Water Maintenance",
      status: "Pending",
    },
  ];

  const complaints = [
    "Water leakage issue",
    "Electric repair needed",
  ];

  const payments = [
    "₹500 Payment Successful",
    "₹1200 Payment Pending",
  ];

  const notifications = [
    "Worker assigned successfully",
    "Booking confirmed",
  ];

  return (

    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          Manage your land services easily
        </p>

      </div>

      {/* STATS */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <h2>12</h2>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <h2>4</h2>
          <p>Pending Complaints</p>
        </div>

        <div className="stat-card">
          <h2>8</h2>
          <p>Completed Services</p>
        </div>

        <div className="stat-card">
          <h2>₹5400</h2>
          <p>Total Payments</p>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">

        {/* RECENT BOOKINGS */}
        <div className="dashboard-box">

          <h3>Recent Bookings</h3>

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="dashboard-item"
            >
              <span>{booking.service}</span>

              <span className="status">
                {booking.status}
              </span>
            </div>

          ))}

        </div>

        {/* COMPLAINTS */}
        <div className="dashboard-box">

          <h3>Recent Complaints</h3>

          {complaints.map((item, index) => (

            <div
              key={index}
              className="dashboard-item"
            >
              {item}
            </div>

          ))}

        </div>

        {/* PAYMENTS */}
        <div className="dashboard-box">

          <h3>Payment History</h3>

          {payments.map((item, index) => (

            <div
              key={index}
              className="dashboard-item"
            >
              {item}
            </div>

          ))}

        </div>

        {/* NOTIFICATIONS */}
        <div className="dashboard-box">

          <h3>Notifications</h3>

          {notifications.map((item, index) => (

            <div
              key={index}
              className="dashboard-item"
            >
              {item}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;