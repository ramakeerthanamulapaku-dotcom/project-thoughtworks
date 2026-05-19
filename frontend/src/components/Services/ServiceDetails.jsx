import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../../services/api";

import "./Services.css";

function ServiceDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  // SERVICE STATE

  const [service, setService] =
    useState(null);


  // FETCH SERVICE

  useEffect(() => {

    const fetchService =
      async () => {

        try {

          const res =
            await API.get(`/services/${id}`);

          setService(
            res.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchService();

  }, [id]);


  // BOOK SERVICE

  const handleBooking = () => {

    const token =
      localStorage.getItem(
        "token"
      );


    // USER NOT LOGGED IN

    if (!token) {

      navigate("/login");

      return;
    }


    // GO TO BOOKING FORM

    navigate(

      "/book-service",

      {

        state: {

          service: service,
        },
      }
    );
  };


  // LOADING

  if (!service) {

    return (
      <h2>
        Loading...
      </h2>
    );
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


          {/* BUTTON */}

          <div className="details-buttons">

            <button

              className="book-btn"

              onClick={
                handleBooking
              }
            >

              Book Service

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ServiceDetails;