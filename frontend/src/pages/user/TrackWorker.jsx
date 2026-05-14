import {
  useEffect,
  useState,
  useMemo,
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
  "http://localhost:5000"
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


  // TOKEN

  const token =
    localStorage.getItem(
      "token"
    );


  // =========================
  // FETCH BOOKINGS
  // =========================

  const fetchBookings =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/bookings",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setBookings(
          res.data.bookings || []
        );

      } catch (error) {

        console.log(error);
      }
    };


  // INITIAL LOAD

  useEffect(() => {

    fetchBookings();

  }, []);


  // =========================
  // SOCKET LISTENER
  // =========================

  useEffect(() => {

    socket.on(
      "receiveWorkerLocation",

      (data) => {

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
            for your bookings.
          </p>

        </div>


        {/* BOOKINGS */}

        <div className="booking-buttons">

          {bookings.map(
            (booking) => (

              <button
                key={booking._id}

                onClick={() =>
                  setSelectedBooking(
                    booking
                  )
                }

                className="booking-btn"
              >

                {
                  booking
                    ?.serviceId
                    ?.title
                }

              </button>
            )
          )}

        </div>


        {/* SELECTED */}

        {selectedBooking && (

          <div className="tracking-section">

            {/* INFO CARD */}

            <div className="tracking-card">

              <h2>

                {
                  selectedBooking
                    ?.serviceId
                    ?.title
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
                  Status:
                </strong>

                {" "}

                {
                  selectedBooking
                    ?.status
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
        )}

      </div>

    </>
  );
};

export default TrackWorker;