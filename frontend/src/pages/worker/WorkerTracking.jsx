import {
  useEffect,
  useState,
} from "react";

import io from "socket.io-client";

import axios from "axios";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./WorkerTracking.css";


// SOCKET CONNECTION

const socket = io(

  "http://localhost:5000",

  {
    autoConnect: false,
  }
);


const WorkerTracking = () => {

  const [location, setLocation] =
    useState(null);

  const [tracking, setTracking] =
    useState(false);

  const [activeBooking, setActiveBooking] =
    useState(null);


  // SOCKET CONNECT

  useEffect(() => {

    socket.connect();

    return () => {

      socket.disconnect();
    };

  }, []);


  // LOAD ACTIVE BOOKING

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


  // =========================
  // START LIVE TRACKING
  // =========================

  const startTracking = () => {

    const userInfo =
      JSON.parse(

        localStorage.getItem(
          "userInfo"
        )
      );


    if (!activeBooking) {

      alert(
        "No active booking assigned"
      );

      return;
    }


    setTracking(true);


    navigator.geolocation.watchPosition(

      async (position) => {

        const liveLocation = {

          bookingId:
            activeBooking._id,

          workerId:
            userInfo._id,

          location: {

            latitude:
              position.coords.latitude,

            longitude:
              position.coords.longitude,
          },

          timestamp:
            new Date()
              .toLocaleTimeString(),
        };


        // UPDATE UI

        setLocation({

          latitude:
            liveLocation.location.latitude,

          longitude:
            liveLocation.location.longitude,

          timestamp:
            liveLocation.timestamp,
        });


        // SOCKET EMIT

        socket.emit(

          "worker-location",

          liveLocation
        );


        // OPTIONAL DB UPDATE

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          await axios.put(

            `http://localhost:5000/api/bookings/${activeBooking._id}`,

            {

              workerLocation: {

                lat:
                  position.coords.latitude,

                lng:
                  position.coords.longitude,
              },
            },

            {
              headers: {

                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        } catch (error) {

          console.log(
            "DB location update failed",
            error
          );
        }

      },

      (error) => {

        console.log(error);

        alert(
          "Location access denied"
        );
      },

      {

        enableHighAccuracy: true,

        maximumAge: 0,

        timeout: 5000,
      }
    );
  };


  return (

    <div className="tracking-page">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN CONTENT */}

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


          {/* ACTIVE BOOKING */}

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


                <p>

                  <strong>
                    Booking Status:
                  </strong>

                  {" "}

                  {
                    activeBooking
                      ?.status
                  }

                </p>

              </div>
            )
          }


          {/* TRACKING CARD */}

          <div className="tracking-card">

            {

              !tracking ? (

                <button

                  className="track-btn"

                  onClick={
                    startTracking
                  }
                >

                  Start Live Tracking

                </button>

              ) : (

                <div className="live-box">

                  <h2>
                    Tracking Active
                  </h2>


                  {

                    location && (

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
                    )
                  }

                </div>
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default WorkerTracking;