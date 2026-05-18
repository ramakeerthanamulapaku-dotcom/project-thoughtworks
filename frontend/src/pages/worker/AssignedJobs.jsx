import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./AssignedJobs.css";

const AssignedJobs = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH PENDING + WORKER JOBS

  const fetchJobs = async () => {

    try {

      setLoading(true);

      // PENDING BOOKINGS
      const pendingResponse = await axios.get(
        "http://localhost:5000/api/bookings/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // WORKER BOOKINGS
      const workerResponse = await axios.get(
        "http://localhost:5000/api/bookings/worker",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pendingJobs =
        pendingResponse.data.bookings || [];

      const workerJobs =
        workerResponse.data.bookings || [];

      // MERGE BOTH
      setJobs([
        ...pendingJobs,
        ...workerJobs,
      ]);

    } catch (error) {

      console.log(
        "Error fetching jobs:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // ACCEPT JOB

  const acceptJob = async (bookingId) => {

    try {

      const response = await axios.put(

        `http://localhost:5000/api/bookings/${bookingId}/accept`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const acceptedBooking =
        response.data.booking;

      // SAVE ACTIVE BOOKING

      localStorage.setItem(
        "activeBooking",
        JSON.stringify(acceptedBooking)
      );

      localStorage.setItem(
        "activeBookingId",
        acceptedBooking._id
      );

      localStorage.setItem(
        "activeUserId",
        acceptedBooking.userId?._id || ""
      );

      alert(
        "Booking Accepted Successfully"
      );

      fetchJobs();

      navigate(
        "/worker-live-tracking"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to accept booking"
      );
    }
  };

  // UPDATE STATUS

  const updateStatus = async (
    bookingId,
    status
  ) => {

    try {

      await axios.put(

        `http://localhost:5000/api/bookings/${bookingId}/status`,

        { status },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update status"
      );
    }
  };

  // REJECT JOB

  const rejectJob = async (
    bookingId
  ) => {

    try {

      await axios.put(

        `http://localhost:5000/api/bookings/${bookingId}/reject`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to reject booking"
      );
    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  // FILTERS

  const pendingJobs =
    jobs.filter(
      (job) =>
        job.status === "pending"
    );

  const activeJobs =
    jobs.filter(
      (job) =>
        job.status === "accepted" ||
        job.status === "working"
    );

  return (

    <div className="worker-page">

      <Sidebar />

      <div className="worker-content">

        <Navbar />

        {/* HEADER */}

        <div className="assigned-header">

          <h1>
            Pending Jobs
          </h1>

          <p>
            Accept nearby bookings
          </p>

        </div>

        {/* LOADING */}

        {
          loading ? (

            <div className="loading">
              Loading jobs...
            </div>

          ) : (

            <>
              {/* PENDING JOBS */}

              <div className="jobs-grid">

                {
                  pendingJobs.length > 0 ? (

                    pendingJobs.map((job) => (

                      <div
                        key={job._id}
                        className="job-card"
                      >

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

                        <div className="job-details">

                          <p>
                            <strong>
                              Customer:
                            </strong>{" "}
                            {job.fullName}
                          </p>

                          <p>
                            <strong>
                              Phone:
                            </strong>{" "}
                            {job.phone}
                          </p>

                          <p>
                            <strong>
                              Address:
                            </strong>{" "}
                            {job.address}
                          </p>

                          <p>
                            <strong>
                              City:
                            </strong>{" "}
                            {job.city}
                          </p>

                          <p>
                            <strong>
                              Date:
                            </strong>{" "}
                            {job.bookingDate}
                          </p>

                          <p>
                            <strong>
                              Time:
                            </strong>{" "}
                            {job.bookingTime}
                          </p>

                        </div>

                        <div className="job-buttons">

                          <button
                            className="accept-btn"
                            onClick={() =>
                              acceptJob(job._id)
                            }
                          >
                            Accept Job
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              rejectJob(job._id)
                            }
                          >
                            Reject
                          </button>

                        </div>

                      </div>
                    ))

                  ) : (

                    <p>
                      No pending jobs
                    </p>
                  )
                }

              </div>

              {/* ACTIVE JOBS */}

              <div
                className="assigned-header"
                style={{
                  marginTop: "50px",
                }}
              >

                <h1>
                  Active Jobs
                </h1>

                <p>
                  Continue assigned works
                </p>

              </div>

              <div className="jobs-grid">

                {
                  activeJobs.length > 0 ? (

                    activeJobs.map((job) => (

                      <div
                        key={job._id}
                        className="job-card"
                      >

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

                        <div className="job-details">

                          <p>
                            <strong>
                              Customer:
                            </strong>{" "}
                            {job.fullName}
                          </p>

                          <p>
                            <strong>
                              Phone:
                            </strong>{" "}
                            {job.phone}
                          </p>

                          <p>
                            <strong>
                              Address:
                            </strong>{" "}
                            {job.address}
                          </p>

                        </div>

                        <div className="job-buttons">

                          {
                            job.status === "accepted" ? (

                              <button
                                className="accept-btn"
                                onClick={() =>
                                  updateStatus(
                                    job._id,
                                    "working"
                                  )
                                }
                              >
                                Start Work
                              </button>

                            ) : (

                              <button
                                className="accept-btn"
                                onClick={() =>
                                  updateStatus(
                                    job._id,
                                    "completed"
                                  )
                                }
                              >
                                Complete Work
                              </button>

                            )
                          }

                        </div>

                      </div>
                    ))

                  ) : (

                    <p>
                      No active jobs
                    </p>
                  )
                }

              </div>
            </>
          )
        }

      </div>

    </div>
  );
};

export default AssignedJobs;