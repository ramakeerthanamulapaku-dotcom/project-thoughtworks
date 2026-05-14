import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../../components/Common/Navbar";

import Sidebar from "../../components/Common/Sidebar";

import "./userBookings.css";


const Mybookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH BOOKINGS
  const fetchBookings =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

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

        console.log(
          "BOOKINGS:",
          res.data
        );

        setBookings(
          res.data.bookings || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchBookings();

  }, []);

  return (

    <div className="dashboard-layout">

      {/* NAVBAR */}
      <Navbar />

      <div className="dashboard-body">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="dashboard-content">

          <div className="bookings-page">

            <h1>
              My Bookings
            </h1>

            <p className="subtitle">

              Track your booked
              land maintenance services.

            </p>

            {loading ? (

              <h2>
                Loading bookings...
              </h2>

            ) : bookings.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No bookings found
                </h3>

              </div>

            ) : (

              bookings.map((booking) => (

                <div
                  key={booking._id}
                  className="booking-card"
                >

                  {/* LEFT */}
                  <div>

                    <h2>

                      {
                        booking
                          ?.serviceId
                          ?.name ||

                        booking
                          ?.serviceId
                          ?.title ||

                        "Service"
                      }

                    </h2>

                    <p>

                      Worker:

                      {" "}

                      {
                        booking
                          ?.workerId
                          ?.name ||

                        "Not Assigned"
                      }

                    </p>

                    <p>

                      Date:

                      {" "}

                      {
                        booking.date ||
                        "No Date"
                      }

                    </p>

                    <p>

                      Time:

                      {" "}

                      {
                        booking.time ||
                        "No Time"
                      }

                    </p>

                  </div>

                  {/* RIGHT */}
                  <div>

                    <span
                      className={`status ${booking.status}`}
                    >

                      {booking.status}

                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Mybookings;