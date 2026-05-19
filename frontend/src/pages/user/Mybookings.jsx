import { useEffect, useState } from "react";

import API from "../../services/api";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./userBookings.css";

const MyBookings = () => {

  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH USER BOOKINGS

  const fetchBookings =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )
          );


        const res =
          await API.get(`/bookings/user/${userInfo._id}`, {
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

              Track all your land
              maintenance services.

            </p>


            {/* LOADING */}

            {

              loading ? (

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

                    {/* LEFT SECTION */}

                    <div className="booking-left">

                      <h2>

                        {
                          booking.serviceName
                        }

                      </h2>


                      <p>

                        <strong>
                          Worker:
                        </strong>

                        {" "}

                        {
                          booking
                            ?.workerId
                            ?.name ||

                          "Not Assigned Yet"
                        }

                      </p>


                      <p>

                        <strong>
                          Address:
                        </strong>

                        {" "}

                        {
                          booking.address
                        }

                      </p>


                      <p>

                        <strong>
                          City:
                        </strong>

                        {" "}

                        {
                          booking.city
                        }

                      </p>


                      <p>

                        <strong>
                          Date:
                        </strong>

                        {" "}

                        {
                          booking.bookingDate
                        }

                      </p>


                      <p>

                        <strong>
                          Time:
                        </strong>

                        {" "}

                        {
                          booking.bookingTime
                        }

                      </p>

                    </div>


                    {/* RIGHT SECTION */}

                    <div className="booking-right">

                      <span
                        className={`status ${booking.status}`}
                      >

                        {booking.status}

                      </span>


                      {/* TRACK BUTTON */}

                      {

                        booking.status === "accepted" && (

                          <button

                            className="track-btn"

                            onClick={() => {

                              localStorage.setItem(

                                "trackingBooking",

                                JSON.stringify(
                                  booking
                                )
                              );

                              navigate(
                                "/track-worker"
                              );
                            }}
                          >

                            Track Worker

                          </button>
                        )
                      }


                      {/* COMPLETED */}

                      {

                        booking.status === "completed" && (

                          <button
                            className="completed-btn"
                          >

                            Service Completed

                          </button>
                        )
                      }

                    </div>

                  </div>
                ))
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default MyBookings;