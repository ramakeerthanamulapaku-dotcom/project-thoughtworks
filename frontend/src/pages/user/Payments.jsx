import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./payments.css";


const PaymentPage = () => {

  const [bookings, setBookings] =
    useState([]);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const token =
    localStorage.getItem(
      "token"
    );


  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );


  // ==========================
  // FETCH BOOKINGS
  // ==========================

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

      if (
        !selectedBooking
      ) return;


      try {

        setLoading(true);


        // ALREADY PAID

        if (
          selectedBooking.paymentStatus ===
          "paid"
        ) {

          alert(
            "Already Paid"
          );

          return;
        }


        const loaded =
          await loadRazorpayScript();

        if (!loaded) {

          alert(
            "Razorpay SDK Failed"
          );

          return;
        }


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


        // RAZORPAY OPTIONS

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
            "Land Maintenance Service",

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

                      bookingId:
                        selectedBooking._id,

                      amount,
                    },

                    {
                      headers: {
                        Authorization:
                          `Bearer ${token}`,
                      },
                    }
                  );


                if (
                  verifyRes.data.success
                ) {

                  alert(
                    "Payment Successful ✅"
                  );


                  // REFRESH BOOKINGS

                  fetchBookings();


                  // UPDATE CURRENT

                  setSelectedBooking(
                    {
                      ...selectedBooking,

                      paymentStatus:
                        "paid",
                    }
                  );

                } else {

                  alert(
                    "Verification Failed"
                  );
                }

              } catch (error) {

                console.log(error);

                alert(
                  "Verification Error"
                );
              }
            },


          prefill: {

            name:
              userInfo?.name,

            email:
              userInfo?.email,
          },


          theme: {

            color:
              "#22c55e",
          },
        };


        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

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

      <div className="payment-page">

        {/* HEADER */}

        <div className="payment-header">

          <h1>
            Payments
          </h1>

          <p>
            Complete payments
            for your bookings.
          </p>

        </div>


        {/* BOOKINGS */}

        <div className="booking-list">

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


        {/* PAYMENT CARD */}

        {selectedBooking && (

          <div className="payment-card">

            <h2>

              {
                selectedBooking
                  ?.serviceId
                  ?.title
              }

            </h2>


            <div className="payment-details">

              <p>

                <strong>
                  Amount:
                </strong>

                {" "}

                ₹

                {
                  selectedBooking
                    ?.serviceId
                    ?.price
                }

              </p>


              <p>

                <strong>
                  Booking Status:
                </strong>

                {" "}

                {
                  selectedBooking
                    ?.status
                }

              </p>


              <p>

                <strong>
                  Payment Status:
                </strong>

                {" "}

                <span
                  className={
                    selectedBooking.paymentStatus ===
                    "paid"

                      ? "paid"

                      : "pending"
                  }
                >

                  {
                    selectedBooking.paymentStatus ||

                    "pending"
                  }

                </span>

              </p>

            </div>


            <button
              onClick={
                handlePayment
              }

              disabled={
                loading ||

                selectedBooking.paymentStatus ===
                  "paid"
              }

              className="pay-btn"
            >

              {
                selectedBooking.paymentStatus ===
                "paid"

                  ? "Payment Completed"

                  : loading

                  ? "Processing..."

                  : "Pay Now"
              }

            </button>

          </div>
        )}

      </div>

    </>
  );
};

export default PaymentPage;