import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./WorkerDashboard.css";


const WorkerDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const token =
    localStorage.getItem("token");
  
  const [stats, setStats] =
    useState({});
  
  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH WORKER BOOKINGS
  const fetchDashboardData =
  async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:5000/api/dashboard/worker-stats",

          {
            headers: {

              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setJobs(
        response.data.recentJobs || []
      );

      setStats(
        response.data.stats
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };  

  useEffect(() => {

    fetchDashboardData(); 
  }, []);




  // STATS

 

 


  return (
    <>

      <Navbar />

      <Sidebar />

      <div className="worker-dashboard">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <h1>
              Worker Dashboard
            </h1>

            <p>
              Welcome back,
              {" "}
              {user?.name}
            </p>

          </div>


          <img
            src={
              user?.profilePic ||

              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }

            alt="profile"

            className="profile-img"
          />

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="loading">
            Loading Dashboard...
          </div>

        ) : (

          <>

            {/* STATS */}

            <div className="stats-grid">

              <Card
                title="Assigned Jobs"
                value={stats.assignedJobs || 0}
              />

              <Card
                title="Completed Works"
                value={stats.completedJobs || 0}
              />

              <Card
                title="Pending Tasks"
                value={stats.pendingJobs || 0}
              />

              <Card
                title="Earnings"
                value={`₹${stats.totalEarnings || 0}`}
              />

            </div>


            {/* ACTIONS */}

            <h2 className="actions-title">
              Worker Actions
            </h2>

            <div className="actions-grid">

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

          </>
        )}

      </div>

    </>
  );
};


const Card = ({
  title,
  value,
}) => {

  return (

    <div className="dashboard-card">

      <h2>
        {value}
      </h2>

      <p>
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

    <div className="action-card">

      <h3>
        {title}
      </h3>

      <p>
        {desc}
      </p>

    </div>
  );
};

export default WorkerDashboard;