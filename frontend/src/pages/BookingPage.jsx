import { useEffect, useState } from "react";
import API from "../services/api";

const UserBookings = () => {

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
          await API.get("/bookings", {
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

        // BACKEND RETURNS
        // { success: true, bookings: [] }

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

  if (loading) {

    return (
      <h2>
        Loading bookings...
      </h2>
    );

  }

  return (

    <div className="page">

      <div className="container">

        <h1>
          My Bookings
        </h1>

        <p>
          Track your booked
          land maintenance services.
        </p>

        {/* NO BOOKINGS */}
        {bookings.length === 0 && (

          <div
            style={{
              marginTop: "30px",
            }}
          >

            <h3>
              No bookings found
            </h3>

          </div>

        )}

        {/* BOOKINGS */}
        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="booking-card"
            style={{

              background: "#fff",

              padding: "20px",

              marginTop: "20px",

              borderRadius: "16px",

              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "center",

            }}
          >

            {/* LEFT */}
            <div>

              <h2>

                {
                  booking
                    ?.serviceId
                    ?.title
                }

              </h2>

              <p>

                Worker:

                {" "}

                {booking?.workerId
                  ?.name ||

                  "Not Assigned"}

              </p>

              <p>

                Date:

                {" "}

                {booking.date}

              </p>

              <p>

                Time:

                {" "}

                {booking.time}

              </p>

            </div>

            {/* RIGHT */}
            <div>

              <span
                style={{

                  padding:
                    "10px 20px",

                  borderRadius:
                    "20px",

                  background:
                    booking.status ===
                    "completed"

                      ? "#dcfce7"

                      : booking.status ===
                        "accepted"

                      ? "#dbeafe"

                      : "#fef3c7",

                  color: "#111",

                  fontWeight:
                    "600",

                }}
              >

                {booking.status}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default UserBookings;