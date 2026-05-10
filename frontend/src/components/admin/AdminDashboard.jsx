import { useNavigate } from "react-router-dom";

import "./admin.css";

function AdminDashboard() {

  const navigate = useNavigate();

  // DUMMY DATA
  const stats = {

    bookings: 128,

    payments: 54000,

    services: 12,

    complaints: 9,

    users: 86,

  };

  return (

    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-header">

        <h1>
          Admin Dashboard
        </h1>

        <p>
          Manage LandEase platform
        </p>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        {/* BOOKINGS */}
        <div className="stat-card">

          <h2>
            Total Bookings
          </h2>

          <span>
            {stats.bookings}
          </span>

        </div>

        {/* PAYMENTS */}
        <div className="stat-card">

          <h2>
            Total Payments
          </h2>

          <span>
            ₹ {stats.payments}
          </span>

        </div>

        {/* SERVICES */}
        <div className="stat-card">

          <h2>
            Services
          </h2>

          <span>
            {stats.services}
          </span>

        </div>

        {/* COMPLAINTS */}
        <div className="stat-card">

          <h2>
            Complaints
          </h2>

          <span>
            {stats.complaints}
          </span>

        </div>

        {/* USERS */}
        <div className="stat-card">

          <h2>
            Users
          </h2>

          <span>
            {stats.users}
          </span>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="admin-actions">

        <button
          onClick={() =>
            navigate("/admin/add-service")
          }
        >
          Add Service
        </button>

        <button
          onClick={() =>
            navigate("/services")
          }
        >
          View Services
        </button>

        <button
          onClick={() =>
            navigate("/payments")
          }
        >
          Payment History
        </button>

        <button
          onClick={() =>
            navigate("/complaints")
          }
        >
          Complaints
        </button>

      </div>

      {/* RECENT BOOKINGS */}
      <div className="recent-section">

        <h2>
          Recent Bookings
        </h2>

        <table>

          <thead>

            <tr>

              <th>User</th>

              <th>Service</th>

              <th>Status</th>

              <th>Amount</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Keerthana</td>

              <td>Land Cleaning</td>

              <td>Completed</td>

              <td>₹1200</td>

            </tr>

            <tr>

              <td>Ravi</td>

              <td>Water Maintenance</td>

              <td>Pending</td>

              <td>₹2000</td>

            </tr>

            <tr>

              <td>Sai</td>

              <td>Electrical Repair</td>

              <td>Completed</td>

              <td>₹1500</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;