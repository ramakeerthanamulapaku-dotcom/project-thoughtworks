import { useEffect, useState } from "react";

import io from "socket.io-client";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./WorkerTracking.css";


// SOCKET CONNECTION

const socket = io(
  "http://localhost:5000"
);


const WorkerTracking = () => {

  const [location, setLocation] =
    useState(null);

  const [tracking, setTracking] =
    useState(false);

    // START TRACKING

  const startTracking = () => {

    setTracking(true);


    navigator.geolocation.watchPosition(

      (position) => {

        const liveLocation = {
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

          timestamp:
            new Date()
              .toLocaleTimeString(),
        };
       setLocation(liveLocation);


        // SEND TO SOCKET SERVER

        socket.emit(
          "workerLocation",
          liveLocation
        );
      },

      (error) => {
        console.log(error);
      },

      {
        enableHighAccuracy: true,
      }
    );
  };

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
            Share your realtime
            location updates.
          </p>


          <div className="tracking-card">

            {!tracking ? (

              <button
                className="track-btn"
                onClick={startTracking}
              >
                Start Live Tracking
              </button>

            ) : (

              <div className="live-box">

                <h2>
                  Tracking Active
                </h2>

                {location && (
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
                        location.timestamp
                      }
                    </p>

                  </>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default WorkerTracking;

