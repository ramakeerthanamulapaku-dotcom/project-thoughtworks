import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./MaintenanceRequests.css";

const MaintenanceRequests = () => {

  const token =
    localStorage.getItem("token");

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      location: "",

      priority: "medium",

    });

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(false);


  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };


  // ==========================
  // FETCH REQUESTS
  // ==========================

  const fetchRequests =
    async () => {

      try {

        const response =
          await API.get("/maintenance/my-requests", {
            headers: {

                Authorization:
                  `Bearer ${token}`,

              },
            }
          );

        setRequests(

          Array.isArray(
            response.data
          )

            ? response.data

            : response.data
                .maintenance || []

        );

      } catch (error) {

        console.log(error);
      }
    };


  // ==========================
  // SUBMIT REQUEST
  // ==========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await API.post("/maintenance/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`,

            },
          }
        );

        alert(
          "Maintenance request submitted successfully!"
        );

        setFormData({

          title: "",

          description: "",

          location: "",

          priority: "medium",

        });

        fetchRequests();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to submit request"
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchRequests();

  }, []);


  return (

    <div className="maintenance-page">

      <Navbar />

      <Sidebar />

      <div className="maintenance-content">

        {/* HEADER */}

        <div className="maintenance-header">

          <h1>
            Maintenance Requests
          </h1>

          <p>
            Raise and track your
            land maintenance issues.
          </p>

        </div>


        {/* FORM */}

        <div className="maintenance-card">

          <h2>
            Create Request
          </h2>

          <form
            onSubmit={
              handleSubmit
            }

            className="maintenance-form"
          >

            <input
              type="text"

              name="title"

              placeholder="Issue Title"

              value={
                formData.title
              }

              onChange={
                handleChange
              }

              required
            />


            <input
              type="text"

              name="location"

              placeholder="Land Location"

              value={
                formData.location
              }

              onChange={
                handleChange
              }

              required
            />


            <select
              name="priority"

              value={
                formData.priority
              }

              onChange={
                handleChange
              }
            >

              <option value="low">
                Low Priority
              </option>

              <option value="medium">
                Medium Priority
              </option>

              <option value="high">
                High Priority
              </option>

            </select>


            <textarea
              rows="4"

              name="description"

              placeholder="Describe the issue"

              value={
                formData.description
              }

              onChange={
                handleChange
              }

              required
            />


            <button type="submit">

              {loading

                ? "Submitting..."

                : "Submit Request"}

            </button>

          </form>

        </div>


        {/* REQUESTS */}

        <div className="requests-section">

          <h2>
            Previous Requests
          </h2>


          {requests.length === 0 ? (

            <div className="empty-box">

              No maintenance requests found.

            </div>

          ) : (

            <div className="requests-grid">

              {requests.map(
                (request) => (

                  <div
                    key={
                      request._id
                    }

                    className="request-card"
                  >

                    <div className="request-top">

                      <h3>
                        {
                          request.title
                        }
                      </h3>

                      <span
                        className={`status ${request.status}`}
                      >

                        {
                          request.status
                        }

                      </span>

                    </div>


                    <p>

                      <strong>
                        Location:
                      </strong>

                      {" "}

                      {
                        request.location
                      }

                    </p>


                    <p>

                      <strong>
                        Priority:
                      </strong>

                      {" "}

                      {
                        request.priority
                      }

                    </p>


                    <p>

                      <strong>
                        Description:
                      </strong>

                      {" "}

                      {
                        request.description
                      }

                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default MaintenanceRequests;