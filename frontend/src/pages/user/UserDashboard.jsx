import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

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
        {/* TOP PROFILE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "34px", marginBottom: "8px" }}>
              User Dashboard
            </h1>
            <p style={{ color: "#64748b" }}>
              Welcome back, {user?.name || "User"} 👋
            </p>
          </div>

          <Link to="/profile">
            <img
              src={
                user?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #22c55e",
              }}
            />
          </Link>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <DashboardCard title="Total Bookings" value="12" />
          <DashboardCard title="Active Services" value="3" />
          <DashboardCard title="Pending Payments" value="2" />
          <DashboardCard title="Reviews Given" value="8" />
        </div>

        {/* QUICK ACTIONS */}
        <h2 style={{ marginBottom: "18px" }}>Quick Actions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
          }}
        >
          <ActionCard
            title="Book Services"
            text="Book land cleaning, maintenance, fencing, watering and more."
            link="/user-book-services"
          />

          <ActionCard
            title="My Bookings"
            text="View your current, pending and completed bookings."
            link="/user-my-bookings"
          />

          <ActionCard
            title="Maintenance Requests"
            text="Raise and track land maintenance requests."
            link="/user-maintenance-requests"
          />

          <ActionCard
            title="Payments"
            text="Check payment status and transaction details."
            link="/user-payments"
          />

          <ActionCard
            title="Reviews"
            text="Give feedback and ratings for completed services."
            link="/user-reviews"
          />

          <ActionCard
            title="Track Worker"
            text="Track assigned worker location after booking."
            link="/track-worker"
          />

          <ActionCard
            title="Chat With Worker"
            text="Chat with your assigned worker about service details."
            link="/user-chat"
          />
        </div>
      </div>
    </>
  );
};

const DashboardCard = ({ title, value }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ color: "#22c55e", fontSize: "32px" }}>{value}</h2>
      <p style={{ color: "#64748b", marginTop: "8px" }}>{title}</p>
    </div>
  );
};

const ActionCard = ({ title, text, link }) => {
  return (
    <Link
      to={link}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          minHeight: "150px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          transition: "0.3s",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#0f172a" }}>{title}</h3>
        <p style={{ color: "#64748b", lineHeight: "1.6" }}>{text}</p>
      </div>
    </Link>
  );
};

export default UserDashboard;