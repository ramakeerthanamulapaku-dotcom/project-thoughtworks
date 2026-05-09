import React from "react";
import "./Services.css";

const ServiceCard = ({ service, onView }) => {
  return (
    <div className="service-card">
      <h3>{service.title}</h3>

      <p>{service.shortDesc}</p>

      <div className="service-meta">
        <span>💰 ₹{service.price}</span>
        <span>⏱ {service.duration}</span>
      </div>

      <button onClick={() => onView(service)}>
        View Details
      </button>
    </div>
  );
};

export default ServiceCard;