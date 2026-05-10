import React from "react";
import "./Services.css";

const ServiceDetails = ({ service, onBack }) => {
  if (!service) return null;

  return (
    <div className="service-details">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <h2>{service.title}</h2>

      <p className="desc">{service.fullDesc}</p>

      <div className="info-box">
        <p><b>Price:</b> ₹{service.price}</p>
        <p><b>Duration:</b> {service.duration}</p>
        <p><b>Category:</b> {service.category}</p>
      </div>

      <button className="book-btn">
        Book Service
      </button>
    </div>
  );
};

export default ServiceDetails;