import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const Reviews = () => {

  const [bookings,
    setBookings] =
    useState([]);

  const [bookingId,
    setBookingId] =
    useState("");

  const [rating,
    setRating] =
    useState("");

  const [comment,
    setComment] =
    useState("");

  const token =
    localStorage.getItem(
      "token"
    );

  // LOAD COMPLETED BOOKINGS

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

      try {

        const res =
          await axios.get(

            "http://localhost:5000/api/reviews/completed",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setBookings(
          res.data
        );

      } catch (error) {

        console.log(error);
      }

    };

  // SUBMIT REVIEW

  const submitReview =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(

          "http://localhost:5000/api/reviews/create",

          {
            bookingId,
            rating,
            comment,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "⭐ Thank you for giving your review!"
        );

        setBookingId("");
        setRating("");
        setComment("");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to submit review"
        );
      }

    };

  return (

    <>
      <Navbar />

      <Sidebar />

      <div
        style={{

          marginLeft: "260px",

          minHeight: "100vh",

          padding:
            "140px 30px 35px",

          background:
            "linear-gradient(135deg,#020617 0%,#071739 35%,#0f172a 70%,#111827 100%)",

          color: "white",

          overflowX: "hidden",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            marginBottom: "25px",
          }}
        >

          <h1
            style={{

              fontSize: "42px",

              fontWeight: "800",

              marginBottom: "8px",

              background:
                "linear-gradient(to right,#ffffff,#86efac)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent",
            }}
          >

            Reviews

          </h1>

          <p
            style={{

              color: "#cbd5e1",

              fontSize: "15px",
            }}
          >

            Give feedback for completed services.

          </p>

        </div>

        {/* REVIEW CARD */}

        <div
          style={{

            background:
              "rgba(255,255,255,0.08)",

            backdropFilter:
              "blur(14px)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            padding: "24px",

            borderRadius: "24px",

            maxWidth: "700px",

            boxShadow:
              "0 8px 28px rgba(0,0,0,0.25)",
          }}
        >

          <h2
            style={{

              color: "white",

              marginBottom: "18px",

              fontSize: "24px",

              fontWeight: "700",
            }}
          >

            Write a Review

          </h2>

          <form

            onSubmit={
              submitReview
            }

            style={{
              display:
                "grid",

              gap:
                "14px",
            }}
          >

            {/* BOOKINGS */}

            <select

              value={
                bookingId
              }

              onChange={(e)=>
                setBookingId(
                  e.target.value
                )
              }

              style={
                inputStyle
              }

              required
            >

              <option value="">
                Select Completed Service
              </option>

              {bookings.map(
                (booking) => (

                  <option
                    key={
                      booking._id
                    }

                    value={
                      booking._id
                    }
                  >

                    {
                      booking.workerId?.name
                    }

                    {" - "}

                    {
                      booking.serviceName
                    }

                  </option>
                )
              )}

            </select>

            {/* RATING */}

            <select

              value={
                rating
              }

              onChange={(e)=>
                setRating(
                  e.target.value
                )
              }

              style={
                inputStyle
              }

              required
            >

              <option value="">
                Select Rating
              </option>

              <option value="1">
                ⭐ 1
              </option>

              <option value="2">
                ⭐⭐ 2
              </option>

              <option value="3">
                ⭐⭐⭐ 3
              </option>

              <option value="4">
                ⭐⭐⭐⭐ 4
              </option>

              <option value="5">
                ⭐⭐⭐⭐⭐ 5
              </option>

            </select>

            {/* COMMENT */}

            <textarea

              placeholder=
                "Write your feedback..."

              rows="4"

              value={
                comment
              }

              onChange={(e)=>
                setComment(
                  e.target.value
                )
              }

              style={
                textareaStyle
              }

              required
            />

            <button
              type="submit"

              style={
                buttonStyle
              }
            >

              Submit Review

            </button>

          </form>

        </div>

      </div>
    </>
  );
};

const inputStyle = {

  height: "50px",

  padding: "0 16px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  outline: "none",

  fontSize: "14px",
};

const textareaStyle = {

  padding: "14px 16px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  outline: "none",

  fontSize: "14px",

  resize: "none",
};

const buttonStyle = {

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "white",

  border: "none",

  height: "50px",

  borderRadius: "14px",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "14px",

  transition: "0.3s ease",
};

export default Reviews;