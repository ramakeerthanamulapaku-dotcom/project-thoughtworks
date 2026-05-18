import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./payments.css";

const UserPayments = () => {

  const [bookings, setBookings] =
    useState([]);

  const [processingPayment, setProcessingPayment] =
    useState(null);

  const token =
    localStorage.getItem("token");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
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
  // HANDLE PAYMENT
  // ==========================
    const handlePayment = async (
  bookingId
) => {

    setProcessingPayment(
      bookingId
    );

  try {

    alert(
      "Processing Payment..."
    );

    // fake loading
    await new Promise(
      (resolve) =>
        setTimeout(resolve, 2000)
    );

    await axios.put(

      `http://localhost:5000/api/bookings/${bookingId}`,

      {
        paymentStatus: "paid",
      },

      {
        headers: {

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert(
      "Payment Successful ✅"
    );

    fetchBookings();

window.location.reload();


  } catch (error) {

    console.log(error);

    alert(
      "Payment Failed ❌"
    );

   } finally {

    setProcessingPayment(
      null
    )


  }
  
};
 

  // ==========================
  // UI
  // ==========================

  return (

    <>
      <Navbar />

      <Sidebar />

      <div className="user-payments-page">

        <div className="user-payments-header">

          <h1 className="user-payments-title">
            Payments
          </h1>

          <p className="user-payments-subtitle">
            Complete your pending payments
          </p>

        </div>

        <div className="user-payments-grid">

          {bookings.map(
            (booking) => (

              <div
                key={booking._id}
                className="user-payment-card"
              >

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
                    booking?.workerId?.name ||

                    "Not Assigned"
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
                    Amount:
                  </strong>

                  {" "}

                  ₹

                  {
                    booking?.serviceId?.price ||

                    500
                  }

                </p>

                <p>

                  <strong>
                    Payment Status:
                  </strong>

                  {" "}

                  <span
                    className={
                      booking.paymentStatus ===
                      "paid"

                        ? "paid-status"

                        : "pending-status"
                    }
                  >

                    {
                      booking.paymentStatus
                    }

                  </span>

                </p>

                {
                  booking.paymentStatus !==
                  "paid" && (

                    <button
                      className="user-payment-btn"

                      disabled={
                        processingPayment ===
                        booking._id
                      }

                      onClick={() =>
                        handlePayment(
                          booking._id
                        )
                      }
                    >
                   
                   {
  processingPayment === booking._id
    ? "Processing..."
    : "Pay Now"
}
                      
                    </button>
                  )
                }

                {
                  booking.paymentStatus ===
                  "paid" && (

                    <button
                      className="completed-payment-btn"
                    >

                      Payment Completed
                    </button>
                  )
                }

              </div>
            )
          )}

        </div>

      </div>
    </>
  );
};

export default UserPayments;