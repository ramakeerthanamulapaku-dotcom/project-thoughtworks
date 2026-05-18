import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import io from "socket.io-client";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./trackWorker.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


// SOCKET CONNECTION

const socket = io(

  "http://localhost:5000",

  {
    autoConnect: false,
  }
);


// MAP RECENTER

const RecenterMap = ({
  lat,
  lng,
}) => {

  const map = useMap();

  useEffect(() => {

    map.setView(
      [lat, lng],
      15
    );

  }, [lat, lng]);

  return null;
};


const TrackWorker = () => {

  const [bookings, setBookings] =
    useState([]);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [location, setLocation] =
    useState({

      lat: 17.385,

      lng: 78.4867,
    });


  const token =
    localStorage.getItem(
      "token"
    );


  // =========================
  // FETCH ACCEPTED BOOKINGS
  // =========================

  const fetchBookings =
    async () => {

      try {

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )
          );


        const res =
          await axios.get(

            `http://localhost:5000/api/bookings/user/${userInfo._id}`,

            {
              headers: {

                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        // ONLY ACCEPTED BOOKINGS

        const acceptedBookings =
          res.data.bookings.filter(

            (booking) =>

              booking.status ===
              "accepted"
          );

          setBookings(
  acceptedBookings
);

if (
  acceptedBookings.length > 0
) {

  setSelectedBooking(
    acceptedBookings[0]
  );

}
        

      } catch (error) {

        console.log(error);
      }
    };


  // INITIAL LOAD

  useEffect(() => {

    fetchBookings();

  }, []);


  // SOCKET CONNECT

  useEffect(() => {

    socket.connect();

    return () => {

      socket.disconnect();
    };

  }, []);


  // =========================
  // LIVE SOCKET LISTENER
  // =========================

  useEffect(() => {

    socket.on(

      "receiveWorkerLocation",

      (data) => {

        console.log(
          "LIVE LOCATION:",
          data
        );


        if (

          selectedBooking &&

          data.bookingId ===
          selectedBooking._id

        ) {

          setLocation({

            lat:
              data.location
                .latitude,

            lng:
              data.location
                .longitude,
          });
        }
      }
    );


    return () => {

      socket.off(
        "receiveWorkerLocation"
      );
    };

  }, [selectedBooking]);


  return (

    <>
      <Navbar />

      <Sidebar />

      <div className="track-page">

        {/* HEADER */}

        <div className="track-header">

          <h1>
            Track Worker
          </h1>

          <p>
            Live worker tracking
            for accepted bookings.
          </p>

        </div>


        {/* EMPTY */}

        {

          bookings.length === 0 && (

            <div className="empty-track">

              No accepted bookings available

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

              {/* INFO CARD */}

              <div className="tracking-card">

                <h2>

                  {
                    selectedBooking
                      .serviceName
                  }

                </h2>


                <p>

                  <strong>
                    Worker:
                  </strong>

                  {" "}

                  {
                    selectedBooking
                      ?.workerId
                      ?.name ||

                    "Not Assigned"
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

              </div>


              {/* LIVE MAP */}

              <div className="map-container">

                <MapContainer

                  center={[
                    location.lat,
                    location.lng,
                  ]}

                  zoom={15}

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