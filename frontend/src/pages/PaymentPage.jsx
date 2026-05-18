import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";

const PaymentPage = () => {

  const [bookings, setBookings] =
    useState([]);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // FETCH BOOKINGS
  // ==========================

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

        setBookings(
          res.data.bookings || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchBookings();

  }, []);

  // ==========================
  // LOAD RAZORPAY
  // ==========================

  const loadRazorpayScript =
    () => {

      return new Promise(
        (resolve) => {

          const script =
            document.createElement(
              "script"
            );

          script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

          script.onload =
            () => resolve(true);

          script.onerror =
            () => resolve(false);

          document.body.appendChild(
            script
          );

        }
      );

    };

  // ==========================
  // HANDLE PAYMENT
  // ==========================

  const handlePayment =
    async () => {

      if (!selectedBooking)
        return;

      try {

        setLoading(true);

        const loaded =
          await loadRazorpayScript();

        if (!loaded) {

          alert(
            "Razorpay failed to load"
          );

          return;

        }

        const token =
          localStorage.getItem(
            "token"
          );

        const amount =
          selectedBooking
            ?.serviceId?.price;

        // CREATE ORDER

        const orderRes =
          await axios.post(

            "http://localhost:5000/api/payments/create-order",

            {
              amount,
            },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const order =
          orderRes.data.order;

        const options = {

          key:
            "rzp_test_SoXotTdP7AygPu",

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "LandEase",

          description:
            "Land Maintenance Payment",

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {

              try {

                const verifyRes =
                  await axios.post(

                    "http://localhost:5000/api/payments/verify-payment",

                    {

                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,

                      amount,

                      bookingId:
                        selectedBooking._id,

                    },

                    {
                      headers: {
                        Authorization:
                          `Bearer ${token}`,
                      },
                    }
                  );

                if (
                  verifyRes.data
                    .success
                ) {

                  alert(
                    "Payment Successful ✅"
                  );

                }

                else {

                  alert(
                    "Payment Verification Failed"
                  );

                }

              } catch (error) {

                console.log(error);

              }

            },

          prefill: {

            name:
              JSON.parse(
                localStorage.getItem(
                  "userInfo"
                )
              )?.name,

            email:
              JSON.parse(
                localStorage.getItem(
                  "userInfo"
                )
              )?.email,

          },

          theme: {

            color:
              "#22c55e",

          },

        };

        const paymentObject =
          new window.Razorpay(
            options
          );

        paymentObject.open();

      } catch (error) {

        console.log(error);

        alert(
          "Payment Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <>
      <Navbar />

      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          padding:
            "110px 40px",
          minHeight: "100vh",
          background:
            "#f8fafc",
        }}
      >

        <h1>
          Payments
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Complete payment
          for your booking.
        </p>

        {/* BOOKINGS */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >

          {bookings.map(
            (booking) => (

              <button

                key={booking._id}

                onClick={() =>
                  setSelectedBooking(
                    booking
                  )
                }

                style={{

                  background:
                    "#22c55e",

                  color: "white",

                  border: "none",

                  padding:
                    "12px 18px",

                  borderRadius:
                    "12px",

                  cursor: "pointer",

                }}
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

        {/* PAYMENT CARD */}

        {selectedBooking && (

          <div
            style={{

              marginTop: "30px",

              background: "white",

              padding: "30px",

              borderRadius: "20px",

              boxShadow:
                "0 6px 18px rgba(0,0,0,0.08)",

              maxWidth: "600px",

            }}
          >

            <h2>

              {
                selectedBooking
                  ?.serviceId
                  ?.title
              }

            </h2>

            <p
              style={{
                marginTop: "12px",
              }}
            >

              Amount:

              {" "}

              ₹

              {
                selectedBooking
                  ?.serviceId
                  ?.price
              }

            </p>

            <p>

              Status:

              {" "}

              {
                selectedBooking
                  ?.status
              }

            </p>

            <button

              onClick={
                handlePayment
              }

              disabled={loading}

              style={{

                marginTop: "25px",

                background:
                  "#22c55e",

                color: "white",

                border: "none",

                padding:
                  "14px 22px",

                borderRadius:
                  "12px",

                cursor: "pointer",

                fontWeight: "600",

              }}
            >

              {loading
                ? "Processing..."
                : "Pay Now"}

            </button>

          </div>

        )}

      </div>

    </>
  );

};

export default PaymentPage;