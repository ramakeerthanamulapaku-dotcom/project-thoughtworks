import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {

  const navigate = useNavigate();

  // OPEN DETAILS
  const openDetails = () => {

    navigate(
      `/services/${service._id}`
    );

  };

  return (

    <div
      className="service-card-box"
      onClick={openDetails}
    >

      {/* IMAGE */}
      <img
        src={service.image}
        alt={service.name}
      />

      {/* CONTENT */}
      <div className="service-content">

        <h3>
          {service.name}
        </h3>

        <p>
          {service.description}
        </p>

        <div className="service-bottom">

          <span>
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