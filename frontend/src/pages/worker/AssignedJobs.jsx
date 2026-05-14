import { useEffect, useState } from "react";
import axios from "axios";
import{ useNavigate } from "react-router-dom";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./AssignedJobs.css";

const token = localStorage.getItem("token");




const AssignedJobs = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  // FETCH WORKER JOBS

  const fetchJobs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/worker/bookings",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setJobs(response.data);

    } catch (error) {

      console.log(
        "Error fetching jobs:",
        error
      );

    } finally {

      setLoading(false);
    }
  };


  // UPDATE STATUS

  const updateStatus = async (
    bookingId,
    status
  ) => {

    try {

      await axios.patch(
        `http://localhost:5000/api/worker/bookings/${bookingId}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // refresh jobs
      fetchJobs();

    } catch (error) {

      console.log(
        "Status update failed",
        error
      );
    }
  };


  useEffect(() => {

    fetchJobs();

  }, []);


  return (

    <div className="worker-page">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN CONTENT */}

      <div className="worker-content">

        {/* NAVBAR */}

        <Navbar />


        {/* PAGE HEADER */}

        <div className="assigned-header">

          <h1>
            Assigned Jobs
          </h1>

          <p>
            Manage all assigned works
          </p>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="loading">
            Loading jobs...
          </div>

        ) : jobs.length === 0 ? (

          <div className="empty">
            No Assigned Jobs Found
          </div>

        ) : (

          <div className="jobs-grid">

            {jobs.map((job) => (

              <div
                key={job._id}
                className="job-card"
              >

                {/* TOP */}

                <div className="job-top">

                  <h2>
                    {job.serviceName}
                  </h2>

                  <span
                    className={`status ${job.status}`}
                  >
                    {job.status}
                  </span>

                </div>


                {/* DETAILS */}

                <div className="job-details">

                  <p>
                    <strong>Customer:</strong>
                    {" "}
                    {job.userId?.name}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    {" "}
                    {job.userId?.email}
                  </p>

                  <p>
                    <strong>Location:</strong>
                    {" "}
                    {job.location}
                  </p>

                  <p>
                    <strong>Amount:</strong>
                    ₹{job.amount}
                  </p>

                </div>


                {/* BUTTONS */}

                <div className="job-buttons">

  <button
    className="view-btn"
    onClick={() =>
      navigate(
        `/worker-update-status/${job._id}`
      )
    }
  >
    View Job
  </button>

  <button
    className="accept-btn"
    onClick={() =>
      updateStatus(
        job._id,
        "accepted"
      )
    }
  >
    Accept
  </button>

  <button
    className="progress-btn"
    onClick={() =>
      updateStatus(
        job._id,
        "in-progress"
      )
    }
  >
    Start Work
  </button>

  <button
    className="complete-btn"
    onClick={() =>
      updateStatus(
        job._id,
        "completed"
      )
    }
  >
    Complete
  </button>

</div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedJobs;