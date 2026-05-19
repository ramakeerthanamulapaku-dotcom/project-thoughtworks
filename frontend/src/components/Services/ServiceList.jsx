import { useEffect, useState } from "react";

import API from "../../services/api";

import ServiceCard from "./ServiceCard";

import "./Services.css";

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
            await API.get("/services");

          setServices(res.data);

        } catch (error) {

          console.log(error);

        }

      };

    fetchServices();

  }, []);

  // FILTER
  const filteredServices = services.filter((service) =>
  (service.title || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (service.category || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);
    

  return (

    <div className="services-page">

      {/* HEADER */}
     <div className="services-header">

  <span className="service-badge">
    Premium Property Solutions
  </span>

  <h1>
    Explore Our
    <span> Smart Services</span>
  </h1>

  <p>
    Book trusted professionals for
    land maintenance, repairs,
    cleaning, security and more.
  </p>

  {/* SEARCH */}

  <div className="search-box">

    <input
      type="text"
      placeholder="Search services..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

  </div>

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