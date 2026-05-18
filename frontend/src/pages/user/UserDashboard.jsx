import { useEffect, useState } from "react";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import { Link } from "react-router-dom";

import axios from "axios";

const UserDashboard = () => {

  const [user, setUser] =
    useState(null);

  const [stats, setStats] =
    useState({

      totalBookings: 0,

      activeServices: 0,

      pendingPayments: 0,

      reviews: 0,
    });

  // FETCH REAL USER DATA

  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          // USER INFO

          const userRes =
            await axios.get(

              "http://localhost:5000/api/auth/profile",

              {
                headers: {

                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setUser(
            userRes.data
          );

          // DASHBOARD STATS

          const statsRes =
            await axios.get(

              "http://localhost:5000/api/dashboard/user-stats",

              {
                headers: {

                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setStats(
            statsRes.data.stats
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchDashboard();

  }, []);

  return (

    <>

      <Navbar />

      <Sidebar />

      <div
        style={{

          marginLeft: "260px",

          minHeight: "100vh",

          padding:
            "140px 30px 35px",

          background:
            "linear-gradient(135deg,#020617 0%,#071739 35%,#0f172a 70%,#111827 100%)",

          color: "white",

          overflowX: "hidden",
        }}
      >

        {/* HEADER */}

        <div
          style={{

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "35px",
          }}
        >

          <div>

            <h1
              style={{

                fontSize: "42px",

                fontWeight: "800",

                marginBottom: "8px",

                background:
                  "linear-gradient(to right,#ffffff,#86efac)",

                WebkitBackgroundClip:
                  "text",

                WebkitTextFillColor:
                  "transparent",
              }}
            >

              User Dashboard

            </h1>

            <p
              style={{

                color: "#cbd5e1",

                fontSize: "15px",
              }}
            >

              Welcome back,
              {" "}

              {
                user?.name ||
                "User"
              }

              👋

            </p>

          </div>

          <Link to="/profile">

            <img

              src={
                user?.profilePic

                  ? user.profilePic

                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }

              alt="profile"

              onError={(e) => {

                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
              }}

              style={{

                width: "70px",

                height: "70px",

                borderRadius: "50%",

                objectFit: "cover",

                border:
                  "3px solid #22c55e",

                boxShadow:
                  "0 0 18px rgba(34,197,94,0.45)",
              }}
            />

          </Link>

        </div>

        {/* STATS */}

        <div
          style={{

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",

            gap: "22px",

            marginBottom: "40px",
          }}
        >

          <DashboardCard
            title="Total Bookings"
            value={
              stats.totalBookings
            }
          />

          <DashboardCard
            title="Active Services"
            value={
              stats.activeServices
            }
          />

          <DashboardCard
            title="Pending Payments"
            value={
              stats.pendingPayments
            }
          />

          <DashboardCard
            title="Reviews Given"
            value={
              stats.reviews
            }
          />

        </div>

        {/* QUICK ACTIONS */}

        <h2
          style={{

            marginBottom: "22px",

            fontSize: "30px",

            fontWeight: "800",

            color: "white",
          }}
        >

          Quick Actions

        </h2>

        <div
          style={{

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: "22px",
          }}
        >

          <ActionCard
            title="Book Services"
            text="Book land cleaning, maintenance, fencing, watering and more."
            link="/services"
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

const DashboardCard = ({
  title,
  value,
}) => {

  return (

    <div
      style={{

        background:
          "rgba(255,255,255,0.08)",

        backdropFilter:
          "blur(14px)",

        border:
          "1px solid rgba(255,255,255,0.08)",

        padding: "24px",

        borderRadius: "22px",

        boxShadow:
          "0 8px 28px rgba(0,0,0,0.25)",
      }}
    >

      <h2
        style={{

          color: "#4ade80",

          fontSize: "36px",

          fontWeight: "800",
        }}
      >

        {value}

      </h2>

      <p
        style={{

          color: "#cbd5e1",

          marginTop: "8px",

          fontSize: "14px",
        }}
      >

        {title}

      </p>

    </div>
  );
};

const ActionCard = ({
  title,
  text,
  link,
}) => {

  return (

    <Link
      to={link}

      style={{

        textDecoration:
          "none",

        color: "inherit",
      }}
    >

      <div
        style={{

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(14px)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          padding: "24px",

          borderRadius: "22px",

          minHeight: "140px",

          boxShadow:
            "0 8px 28px rgba(0,0,0,0.25)",

          transition:
            "0.3s ease",
        }}
      >

        <h3
          style={{

            marginBottom: "10px",

            color: "white",

            fontSize: "22px",

            fontWeight: "700",
          }}
        >

          {title}

        </h3>

        <p
          style={{

            color: "#cbd5e1",

            lineHeight: "1.7",

            fontSize: "14px",
          }}
        >

          {text}

        </p>

      </div>

    </Link>
  );
};

export default UserDashboard;