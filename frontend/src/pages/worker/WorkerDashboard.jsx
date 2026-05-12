import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const WorkerDashboard = () => {
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

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
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1>Worker Dashboard</h1>

            <p
              style={{
                color: "#64748b",
              }}
            >
              Welcome back,
              {user?.name}
            </p>
          </div>

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
            }}
          />
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <Card
            title="Assigned Jobs"
            value="12"
          />

          <Card
            title="Completed Works"
            value="8"
          />

          <Card
            title="Pending Tasks"
            value="4"
          />

          <Card
            title="Earnings"
            value="₹12,500"
          />
        </div>

        {/* QUICK ACTIONS */}
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Worker Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
          }}
        >
          <ActionCard
            title="Assigned Jobs"
            desc="View assigned land maintenance works."
          />

          <ActionCard
            title="Update Work Status"
            desc="Update current work progress."
          />

          <ActionCard
            title="Live Tracking"
            desc="Share your live location."
          />

          <ActionCard
            title="Worker Chat"
            desc="Chat with customers."
          />

          <ActionCard
            title="Earnings"
            desc="View payment and earnings."
          />
        </div>
      </div>
    </>
  );
};

const Card = ({
  title,
  value,
}) => {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow:
          "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          color: "#22c55e",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        {title}
      </p>
    </div>
  );
};

const ActionCard = ({
  title,
  desc,
}) => {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow:
          "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h3>{title}</h3>

      <p
        style={{
          color: "#64748b",
          marginTop: "10px",
        }}
      >
        {desc}
      </p>
    </div>
  );
};

export default WorkerDashboard;