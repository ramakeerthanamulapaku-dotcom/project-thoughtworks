import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from
"../../components/Common/Navbar";

import Sidebar from
"../../components/Common/Sidebar";

import socket from
"../../socket/socket";

import "./trackWorker.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


// ===============================
// MAP RECENTER
// ===============================

const RecenterMap = ({
  lat,
  lng,
}) => {

  const map = useMap();

  useEffect(() => {

    map.setView(
      [lat, lng],
      16
    );

  }, [lat, lng]);

  return null;
};


// ===============================
// MAIN COMPONENT
// ===============================

const TrackWorker = () => {

  const [bookings,
    setBookings] =
    useState([]);

  const [selectedBooking,
    setSelectedBooking] =
    useState(null);

  const [location,
    setLocation] =
    useState({

      lat: 17.3850,

      lng: 78.4867,
    });

  const [workerOnline,
    setWorkerOnline] =
    useState(false);

  const token =
    localStorage.getItem(
      "token"
    );


  // ===============================
  // FETCH USER BOOKINGS
  // ===============================

  const fetchBookings =
    async () => {

      try {

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )
          );

        const response =
          await axios.get(

            `http://localhost:5000/api/bookings/user/${userInfo._id}`,

            {
              headers: {

                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // TRACK ACCEPTED + WORKING

        const activeBookings =
          response.data.bookings.filter(

            (booking) =>

              booking.status ===
              "accepted"

              ||

              booking.status ===
              "working"
          );

        setBookings(
          activeBookings
        );

        // AUTO SELECT FIRST

        if (
          activeBookings.length > 0
        ) {

          setSelectedBooking(
            activeBookings[0]
          );
        }

      } catch (error) {

        console.log(error);
      }
    };


  // ===============================
  // INITIAL LOAD
  // ===============================

  useEffect(() => {

    fetchBookings();

  }, []);


  // ===============================
  // JOIN ROOM
  // ===============================

  useEffect(() => {

    if (!selectedBooking)
      return;

    socket.emit(

      "join-booking-room",

      {
        bookingId:
          selectedBooking._id,
      }
    );

    console.log(
      "Joined Booking Room:",
      selectedBooking._id
    );

  }, [selectedBooking]);


  // ===============================
  // LIVE LOCATION LISTENER
  // ===============================

  useEffect(() => {

    socket.on(

      "location-updated",

      (data) => {

        console.log(
          "LIVE TRACK:",
          data
        );

        // MATCH BOOKING

        if (

          selectedBooking &&

          data.bookingId ===
          selectedBooking._id

        ) {

          setWorkerOnline(true);

          const newLocation = {

            lat:
              data.latitude,

            lng:
              data.longitude,
          };

          setLocation(
            newLocation
          );

          // SAVE LAST LOCATION

          localStorage.setItem(

            `worker-location-${selectedBooking._id}`,

            JSON.stringify(
              newLocation
            )
          );
        }
      }
    );

    return () => {

      socket.off(
        "location-updated"
      );
    };

  }, [selectedBooking]);


  // ===============================
  // LOAD PREVIOUS LOCATION
  // ===============================

  useEffect(() => {

    if (!selectedBooking)
      return;

    const savedLocation =
      localStorage.getItem(

        `worker-location-${selectedBooking._id}`
      );

    if (savedLocation) {

      setLocation(

        JSON.parse(
          savedLocation
        )
      );
    }

  }, [selectedBooking]);


  // ===============================
  // UI
  // ===============================

  return (

    <>
      <Navbar />

      <Sidebar />

      <div className="track-page">

        {/* HEADER */}

        <div className="track-header">

          <h1>
            Live Worker Tracking
          </h1>

          <p>
            Track worker location
            in realtime until work
            gets completed.
          </p>

        </div>


        {/* EMPTY */}

        {

          bookings.length === 0 && (

            <div className="empty-track">

              No active bookings
              available

            </div>
          )
        }


        {/* BOOKING BUTTONS */}

        <div className="booking-buttons">

          {

            bookings.map(
              (booking) => (

                <button

                  key={booking._id}

                  onClick={() =>
                    setSelectedBooking(
                      booking
                    )
                  }

                  className={`booking-btn ${

                    selectedBooking?._id ===
                    booking._id

                    ? "active"

                    : ""
                  }`}
                >

                  {
                    booking.serviceName
                  }

                </button>
              )
            )
          }

        </div>


        {/* TRACKING SECTION */}

        {

          selectedBooking && (

            <div className="tracking-section">

              {/* INFO */}

              <div className="tracking-card">

                <h2>

                  {
                    selectedBooking
                    ?.serviceName
                  }

                </h2>

                <p>

                  <strong>
                    Worker:
                  </strong>

                  {" "}

                  {
                    selectedBooking
                    ?.workerId?.name ||

                    "Assigned Worker"
                  }

                </p>

                <p>

                  <strong>
                    Phone:
                  </strong>

                  {" "}

                  {
                    selectedBooking
                    ?.phone
                  }

                </p>

                <p>

                  <strong>
                    Address:
                  </strong>

                  {" "}

                  {
                    selectedBooking
                    ?.address
                  }

                </p>

                <p>

                  <strong>
                    Status:
                  </strong>

                  {" "}

                  {
                    selectedBooking
                    ?.status
                  }

                </p>

                <p>

                  <strong>
                    Tracking:
                  </strong>

                  {" "}

                  {

                    workerOnline

                    ? "Live"

                    : "Waiting..."
                  }

                </p>

              </div>


              {/* MAP */}

              <div className="map-container">

                <MapContainer

                  center={[
                    location.lat,
                    location.lng,
                  ]}

                  zoom={16}

                  style={{

                    height: "500px",

                    width: "100%",
                  }}
                >

                  <RecenterMap

                    lat={location.lat}

                    lng={location.lng}
                  />

                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker

                    position={[
                      location.lat,
                      location.lng,
                    ]}
                  >

                    <Popup>

                      Worker Live
                      Location 📍

                    </Popup>

                  </Marker>

                </MapContainer>

              </div>

            </div>
          )
        }

      </div>
    </>
  );
};

export default TrackWorker;