import {
  useEffect,
  useState,
} from "react";

import Navbar from
"../../components/Common/Navbar";

import Sidebar from
"../../components/Common/Sidebar";

import socket from
"../../socket/socket";

import "./WorkerTracking.css";

const WorkerTracking = () => {

  const [location, setLocation] =
    useState(null);

  const [activeBooking,
    setActiveBooking] =
    useState(null);

  // LOAD BOOKING

  useEffect(() => {

    const booking =
      JSON.parse(

        localStorage.getItem(
          "activeBooking"
        )
      );

    if (booking) {

      setActiveBooking(
        booking
      );
    }

  }, []);

  // SOCKET LISTENER

  useEffect(() => {

    socket.on(

      "location-updated",

      (data) => {

        setLocation(data);
      }
    );

    // LOAD PREVIOUS LOCATION

    const savedLocation =
      JSON.parse(

        localStorage.getItem(
          "workerLiveLocation"
        )
      );

    if (savedLocation) {

      setLocation(
        savedLocation
      );
    }

    return () => {

      socket.off(
        "location-updated"
      );
    };

  }, []);

  return (

    <div className="tracking-page">

      <Sidebar />

      <div className="tracking-content">

        <Navbar />

        <div className="tracking-container">

          <h1>
            Live Worker Tracking
          </h1>

          <p>
            Tracking continues
            globally across pages.
          </p>

          {

            activeBooking && (

              <div className="booking-info">

                <h2>
                  {
                    activeBooking
                    ?.serviceName
                  }
                </h2>

                <p>

                  <strong>
                    Customer:
                  </strong>

                  {" "}

                  {
                    activeBooking
                    ?.fullName
                  }

                </p>

                <p>

                  <strong>
                    Address:
                  </strong>

                  {" "}

                  {
                    activeBooking
                    ?.address
                  }

                </p>

              </div>
            )
          }

          <div className="tracking-card">

            <div className="live-box">

              <h2>
                Tracking Active
              </h2>

              {

                location ? (

                  <>

                    <p>

                      <strong>
                        Latitude:
                      </strong>

                      {" "}

                      {
                        location.latitude
                      }

                    </p>

                    <p>

                      <strong>
                        Longitude:
                      </strong>

                      {" "}

                      {
                        location.longitude
                      }

                    </p>

                    <p>

                      <strong>
                        Updated:
                      </strong>

                      {" "}

                      {
                        new Date(
                          location.timestamp
                        ).toLocaleTimeString()
                      }

                    </p>

                  </>

                ) : (

                  <p>
                    Waiting for
                    live location...
                  </p>
                )
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default WorkerTracking;