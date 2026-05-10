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

    alert("Service Booked ✅");

    setBooked(true);

  };

  // PAYMENT
  const handlePayment = () => {

    navigate("/booking",{

      state: {
        service,
      },

    });

  };

  // LOADING
  if (!service) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="details-page">

      <div className="details-container">

        {/* IMAGE */}
        <div className="details-image">

          <img
            src={service.image}
            alt={service.name}
          />

        </div>

        {/* CONTENT */}
        <div className="details-content">

          <h1>
            {service.name}
          </h1>

          <p>
            {service.description}
          </p>

          <h2>
            ₹ {service.price}
          </h2>

          {/* BOOK BUTTON */}
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
  );
}

export default ServiceDetails;