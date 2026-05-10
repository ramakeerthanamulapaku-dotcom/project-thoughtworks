import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import "../components/booking/booking.css";

function BookingPage() {

  const navigate = useNavigate();

  const location = useLocation();

  // SERVICE DATA
  const service =
    location.state?.service || {

      name: "Land Cleaning",

      price: 1200,

      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

      description:
        "Professional land cleaning service",

    };

  // FORM STATE
  const [formData, setFormData] =
    useState({

      fullName: "",

      phone: "",

      address: "",

      bookingDate: "",

    });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // BOOK SERVICE
  const handleBooking = (e) => {

    e.preventDefault();

    console.log({

      service,

      bookingDetails:
        formData,

    });

    alert(
      "Booking Successful ✅"
    );

    // NAVIGATE TO PAYMENT
    navigate("/payments", {

      state: {
        service,
      },

    });

  };

  return (

    <div className="booking-page">

      <div className="booking-container">

        {/* LEFT */}
        <div className="booking-left">

          <img
            src={service.image}
            alt={service.name}
          />

          <h2>
            {service.name}
          </h2>

          <p>
            {service.description}
          </p>

          <span>
            ₹ {service.price}
          </span>

        </div>

        {/* RIGHT */}
        <div className="booking-right">

          <h2>
            Book Service
          </h2>

          <form
            onSubmit={handleBooking}
          >

            {/* NAME */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={
                formData.fullName
              }
              onChange={handleChange}
              required
            />

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={
                formData.phone
              }
              onChange={handleChange}
              required
            />

            {/* ADDRESS */}
            <textarea
              name="address"
              placeholder="Service Address"
              value={
                formData.address
              }
              onChange={handleChange}
              required
            ></textarea>

            {/* DATE */}
            <input
              type="date"
              name="bookingDate"
              value={
                formData.bookingDate
              }
              onChange={handleChange}
              required
            />

            {/* BUTTON */}
            <button type="submit">

              Proceed To Payment

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default BookingPage;