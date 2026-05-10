import React from "react";
import ServiceCard from "./ServiceCard";
import "./Services.css";

const ServiceList = ({ services = [], onSelect }) => {
  return (
    <div className="service-list">
      <h2>Available Services</h2>

      <div className="service-grid">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            onView={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;