import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import "./Maintanence.css";


const MaintenanceStatus = () => {

  const token =
    localStorage.getItem("token");


  const [requests, setRequests] =
    useState([]);


  const fetchRequests = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/maintenance/my-requests",

          {
            headers: {
              Authorization: `Bearer ${token}`,
                
            },
          }
        );


      setRequests(
         Array.isArray(response.data)
        ? response.data
        : response.data.maintenance || []
      );

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchRequests();

  }, []);


  return (

    <div>

      <h2>
        Maintenance Status
      </h2>


      <div className="status-list">

        {requests.length === 0 ? (

          <p>
            No requests found.
          </p>

        ) : (

          requests.map((item) => (

            <div
              key={item._id}
              className="status-card"
            >

              <h3>
                {item.title}
              </h3>


              <p>
                {item.description}
              </p>


              <p>
                <strong>
                  Location:
                </strong>
                {" "}
                {item.location}
              </p>


              <p>
                <strong>
                  Priority:
                </strong>
                {" "}
                {item.priority}
              </p>


              <p>
                <strong>
                  Status:
                </strong>
                {" "}
                {item.status}
              </p>


              <p>
                <strong>
                  Worker:
                </strong>
                {" "}
                {
                  item.workerId?.name ||
                  "Not Assigned"
                }
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default MaintenanceStatus;