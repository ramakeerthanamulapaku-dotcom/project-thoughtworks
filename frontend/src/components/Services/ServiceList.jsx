import { useEffect, useState } from "react";

import axios from "axios";

import ServiceCard from "./ServiceCard";

import "./services.css";

function Services() {

  // SERVICES STATE
  const [services, setServices] =
    useState([]);

  // SEARCH STATE
  const [search, setSearch] =
    useState("");

  // FETCH SERVICES
  useEffect(() => {

    const fetchServices =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/services"
            );

          setServices(res.data);

        } catch (error) {

          console.log(error);

        }

      };

    fetchServices();

  }, []);

  // FILTER
  const filteredServices =
    services.filter((service) =>

      service.name
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  return (

    <div className="services-page">

      {/* HEADER */}
      <div className="services-header">

        <h1>
          Our Services
        </h1>

        <p>
          Book trusted land services
        </p>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search Services..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* GRID */}
      <div className="services-grid">

        {filteredServices.map(
          (service) => (

            <ServiceCard
              key={service._id}
              service={service}
            />

          )
        )}

      </div>

    </div>
  );
}

export default Services;