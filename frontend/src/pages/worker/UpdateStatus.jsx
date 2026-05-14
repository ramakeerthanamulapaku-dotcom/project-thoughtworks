import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "./UpdateStatus.css";


const UpdateStatus = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");


  const [job, setJob] =
    useState(null);

  const [status, setStatus] =
    useState("");

  const [note, setNote] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  // FETCH SINGLE JOB

  const fetchJob = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:5000/api/worker/bookings/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

      setJob(response.data);

      setStatus(response.data.status);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  // UPDATE STATUS

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.patch(
        `http://localhost:5000/api/worker/bookings/${id}`,
        {
          status,
          workerNote: note,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Status Updated");

      navigate(
        "/worker-assigned-jobs"
      );

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchJob();

  }, []);


  if (loading) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }


  return (
    <>

      <Navbar />

      <Sidebar />

      <div className="update-page">

        <div className="update-card">

          <h1>
            Update Work Status
          </h1>

          <p className="subtitle">
            Update your assigned
            work progress.
          </p>


          {/* JOB DETAILS */}

          <div className="job-info">

            <p>
              <strong>Service:</strong>
              {" "}
              {job?.serviceName}
            </p>

            <p>
              <strong>Customer:</strong>
              {" "}
              {job?.userId?.name}
            </p>

            <p>
              <strong>Location:</strong>
              {" "}
              {job?.location}
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              {job?.status}
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="update-form"
          >

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >

              <option value="pending">
                Pending
              </option>

              <option value="accepted">
                Accepted
              </option>

              <option value="on-the-way">
                On The Way
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>

            </select>


            <textarea
              placeholder="Add work update note..."
              rows="5"
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
            />

            <button type="submit">
              Update Status
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default UpdateStatus;