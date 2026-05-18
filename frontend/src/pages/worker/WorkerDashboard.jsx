import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import Navbar from
"../../components/Common/Navbar";

import Sidebar from
"../../components/Common/Sidebar";

import "./WorkerDashboard.css";


const WorkerDashboard = () => {

  const user =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    ) || {};

  const token =
    localStorage.getItem(
      "token"
    );

  const [stats,
    setStats] =
    useState({

      assignedJobs: 0,

      completedJobs: 0,

      pendingJobs: 0,

      totalEarnings: 0,
    });

  const [jobs,
    setJobs] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);


  // ===============================
  // FETCH DASHBOARD
  // ===============================

  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);

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

        console.log(
          "WORKER DASHBOARD:",
          response.data
        );

        // STATS

        setStats({

          assignedJobs:
            response.data
              ?.assignedJobs || 0,

          completedJobs:
            response.data
              ?.completedJobs || 0,

          pendingJobs:
            response.data
              ?.pendingJobs || 0,

          totalEarnings:
            response.data
              ?.totalEarnings || 0,
        });

        // RECENT JOBS

        setJobs(
          response.data
            ?.recentJobs || []
        );

      } catch (error) {

        console.log(
          "Dashboard Error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchDashboardData();

  }, []);


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
              {
                user?.name ||
                "Worker"
              }
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

        {

          loading ? (

            <div className="loading">

              Loading Dashboard...

            </div>

          ) : (

            <>
              {/* STATS */}

              <div className="stats-grid">

                <Card
                  title="Assigned Jobs"
                  value={
                    stats.assignedJobs
                  }
                />

                <Card
                  title="Completed Works"
                  value={
                    stats.completedJobs
                  }
                />

                <Card
                  title="Pending Tasks"
                  value={
                    stats.pendingJobs
                  }
                />

                <Card
                  title="Earnings"
                  value={`₹${stats.totalEarnings}`}
                />

              </div>


              {/* ACTIONS */}

              <h2 className="actions-title">

                Worker Actions

              </h2>

              <div className="actions-grid">

                <Link
                  to="/assigned-jobs"
                  className="action-link"
                >

                  <ActionCard
                    title="Assigned Jobs"

                    desc="View assigned land maintenance works."
                  />

                </Link>


                <Link
                  to="/worker-update-status"
                  className="action-link"
                >

                  <ActionCard
                    title="Update Work Status"

                    desc="Update current work progress."
                  />

                </Link>


                <Link
                  to="/worker-live-tracking"
                  className="action-link"
                >

                  <ActionCard
                    title="Live Tracking"

                    desc="Share your live realtime location."
                  />

                </Link>


                <Link
                  to="/worker-chat"
                  className="action-link"
                >

                  <ActionCard
                    title="Worker Chat"

                    desc="Chat with customers."
                  />

                </Link>


                <Link
                  to="/worker-earnings"
                  className="action-link"
                >

                  <ActionCard
                    title="Earnings"

                    desc="View payment and earnings."
                  />

                </Link>

              </div>


              {/* RECENT JOBS */}

              <div className="recent-jobs">

                <h2>
                  Recent Jobs
                </h2>

                {

                  jobs.length === 0 ? (

                    <p>
                      No recent jobs
                    </p>

                  ) : (

                    jobs.map((job) => (

                      <div
                        key={job._id}
                        className="job-item"
                      >

                        <h3>
                          {
                            job.serviceName
                          }
                        </h3>

                        <p>

                          Customer:
                          {" "}

                          {
                            job.fullName
                          }

                        </p>

                        <p>

                          Status:
                          {" "}

                          <span
                            className={`status ${job.status}`}
                          >

                            {
                              job.status
                            }

                          </span>

                        </p>

                      </div>
                    ))
                  )
                }

              </div>

            </>
          )
        }

      </div>

    </>
  );
};


// ===============================
// CARD
// ===============================

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


// ===============================
// ACTION CARD
// ===============================

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