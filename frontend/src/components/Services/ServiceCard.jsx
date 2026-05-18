import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {

  const navigate = useNavigate();

  const openDetails = () => {

    navigate(`/services/${service._id}`);

  };

  return (

    <div
      className="service-card-box"
      onClick={openDetails}
    >

      {/* IMAGE */}
      <div className="service-image">

        <img
          src={service.image}
          alt={service.name}
        />

        {/* OVERLAY */}
        <div className="service-overlay">

          <span>
            Premium Service
          </span>

        </div>

      </div>

      {/* CONTENT */}
      <div className="service-content">

        <h3>
          {service.name}
        </h3>

        <p>
          {service.description}
        </p>

        {/* BOTTOM */}
        <div className="service-bottom">

          <span className="price-tag">
            ₹ {service.price}
          </span>

          <button>
            View Details
          </button>

        </div>

      </div>

    </div>

  );

}

export default ServiceCard;