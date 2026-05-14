import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import "./services.css";

function ServiceDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  // SERVICE STATE
  const [service, setService] =
    useState(null);

  // BOOKED STATE
  const [booked, setBooked] =
    useState(false);

  // FETCH SERVICE
  useEffect(() => {

    const fetchService =
      async () => {

        try {

          const res =
            await axios.get(
              `http://localhost:5000/api/services/${id}`
            );

          setService(res.data);

        } catch (error) {

          console.log(error);

        }

      };

    fetchService();

  }, [id]);

  // BOOK SERVICE
  const handleBooking = () => {

  const token = localStorage.getItem("token");

  if (!token) {

    navigate("/login");

    return;
  }

  alert("Service Booked ✅");

  setBooked(true);
};

  // PAYMENT
  const handlePayment = () => {

  const token = localStorage.getItem("token");

  if (!token) {

    navigate("/login");

    return;
  }

  navigate("/booking", {
    state: { service },
  });
};

  // LOADING
  if (!service) {

    return <h2>Loading...</h2>;

  }

 return (

  <div className="details-page">

    <div className="details-container">

      {/* IMAGE SECTION */}

      <div className="details-image">

        <img
          src={service.image}
          alt={service.name}
        />

        <div className="image-overlay">

          <span className="premium-badge">
            Premium Service
          </span>

        </div>

      </div>

      {/* CONTENT */}

      <div className="details-content">

        <span className="service-tag">
          Trusted LandEase Partner
        </span>

        <h1>
          {service.name}
        </h1>

        <p>
          {service.description}
        </p>

        {/* FEATURES */}

        <div className="service-features">

          <div className="feature-item">
            ✅ Verified Professionals
          </div>

          <div className="feature-item">
            ⚡ Fast Service Booking
          </div>

          <div className="feature-item">
            🔒 Secure Payments
          </div>

        </div>

        {/* PRICE */}

        <div className="price-section">

          <h2>
            ₹ {service.price}
          </h2>

          <span>
            Starting Price
          </span>

        </div>

        {/* BUTTONS */}

        <div className="details-buttons">

          {!booked ? (

            <button
              className="book-btn"
              onClick={handleBooking}
            >

              Book Service

            </button>

          ) : (

            <button
              className="payment-btn"
              onClick={handlePayment}
            >

              Proceed To Payment

            </button>

          )}

        </div>

      </div>

    </div>

  </div>

);
}

export default ServiceDetails;