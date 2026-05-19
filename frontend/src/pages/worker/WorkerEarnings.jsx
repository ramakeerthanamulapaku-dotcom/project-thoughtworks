import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./WorkerEarnings.css";

const WorkerEarnings = () => {

  const [jobs, setJobs] =
    useState([]);

  const [stats, setStats] =
  useState({
    totalEarnings: 0,
    completedJobs: 0,
  });

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  // FETCH WORKER DATA

  const fetchEarnings =
    async () => {

      try {

        const response =
          await API.get("/dashboard/worker-stats", {
            headers: {

                Authorization:
                  `Bearer ${token}`,

              },
            }
          );

        // COMPLETED JOBS ONLY

        const completedJobs =
          (
            response.data
              .recentJobs || []
          ).filter(

            (job) =>

              job.status ===
              "completed"
          );

      setJobs(completedJobs);

const total =
  completedJobs.reduce(
    (acc, job) =>
      acc +
      (
        Number(
          job.serviceId?.price
        ) || 500
      ),
    0
  );

setStats({
  totalEarnings: total,
  completedJobs:
    completedJobs.length,
});
       
      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchEarnings();

  }, []);

  return (

    <div className="earnings-page">

      <Sidebar />

      <div className="earnings-content">

        <Navbar />

        {/* HEADER */}

        <div className="earnings-header">

          <h1>
            Worker Earnings
          </h1>

          <p>
            Track completed jobs
            and total income.
          </p>

        </div>

        {/* STATS */}

        <div className="earnings-stats">

          <div className="stat-card">

            <h2>
              ₹
              {
                stats.totalEarnings || 0
              }
            </h2>

            <p>
              Total Earnings
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {
                stats.completedJobs || 0
              }
            </h2>

            <p>
              Completed Jobs
            </p>

          </div>

        </div>

        {/* JOB LIST */}

        <div className="earnings-card">

          <h2>
            Completed Jobs
          </h2>

          {loading ? (

            <div className="loading">
              Loading...
            </div>

          ) : jobs.length === 0 ? (

            <div className="empty">
              No completed jobs yet.
            </div>

          ) : (

            <div className="jobs-list">

              {jobs.map((job) => (

                <div
                  key={job._id}
                  className="earning-job"
                >

                  <div>

                    <h3>
                      {
                        job.serviceName
                      }
                    </h3>

                    <p>

                      Customer:
                      {" "}

                      {
                        job.userId?.name||
                        "Customer"
                      }

                    </p>

                    <p>

                      Status:
                      {" "}

                      {
                        job.status
                      }

                    </p>

                  </div>

                  <div className="amount">

                    ₹
                    {
                      job.serviceId?.price ||

                      500
                    }

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default WorkerEarnings;