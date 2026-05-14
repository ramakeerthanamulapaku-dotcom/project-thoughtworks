
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./WorkerEarnings.css";


const WorkerEarnings = () => {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const token =
    localStorage.getItem("token");


  // FETCH COMPLETED JOBS

  const fetchEarnings = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/worker/bookings",
          {
            headers: {
              Authorization: token,
            },
          }
        );


      // ONLY COMPLETED JOBS

      const completedJobs =
        response.data.filter(
          (job) =>
            job.status ===
            "completed"
        );


      setJobs(completedJobs);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchEarnings();

  }, []);


  // TOTAL EARNINGS

  const totalEarnings =
    jobs.reduce(
      (acc, job) =>
        acc + job.amount,
      0
    );


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
              ₹{totalEarnings}
            </h2>

            <p>
              Total Earnings
            </p>

          </div>


          <div className="stat-card">

            <h2>
              {jobs.length}
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
                      {job.serviceName}
                    </h3>

                    <p>
                      Customer:
                      {" "}
                      {
                        job.userId?.name
                      }
                    </p>

                    <p>
                      Location:
                      {" "}
                      {job.location}
                    </p>

                  </div>


                  <div className="amount">
                    ₹{job.amount}
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

