// src/pages/AdminDashboard.jsx

import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import "./admindashboard.css";

const AdminDashboard = () => {

  const [showForm, setShowForm] =
    useState(false);

  const [services, setServices] =
    useState([]);

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });

  // =========================
  // FETCH SERVICES
  // =========================

  const fetchServices =
    async () => {

      try {

        const response =
          await axios.get(

            "http://localhost:5000/api/services"
          );

        setServices(
          response.data
        );

      } catch (error) {

        console.log(
          "FETCH ERROR:",
          error
        );
      }
    };

  // LOAD SERVICES
  useEffect(() => {

    fetchServices();

  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // ADD SERVICE
  // =========================

  const handleAddService =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(

            "http://localhost:5000/api/services",

            formData
          );

        alert(
          "Service Added Successfully ✅"
        );

        console.log(
          response.data
        );

        // REFRESH SERVICES
        fetchServices();

        // CLEAR FORM
        setFormData({

          title: "",
          description: "",
          price: "",
          image: "",
          category: "",
        });

        setShowForm(false);

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Add Service ❌"
        );
      }
    };

  return (

    <div className="admin-dashboard">

      {/* NAVBAR */}
      <nav className="admin-navbar">

        <div className="admin-logo">
          LandEase Admin
        </div>

        <button
          className="add-btn"

          onClick={() =>
            setShowForm(!showForm)
          }
        >
          Add Service
        </button>

      </nav>

      {/* PAGE HEADER */}
      <div className="services-page">

        <h1>
          Services List
        </h1>

        <p>
          Manage all land
          maintenance services
        </p>

      </div>

      {/* SERVICES GRID */}
      <div className="services-grid">

        {services.map((service) => (

          <div
            className="service-card"

            key={service._id}
          >

            <img
              src={service.image}

              alt={service.title}
            />

            <h2>
              {service.title}
            </h2>

            <p>
              {service.description}
            </p>

            <h3>
              ₹ {service.price}
            </h3>

            <span>
              {service.category}
            </span>

          </div>
        ))}

      </div>

      {/* ADD SERVICE FORM */}
      {showForm && (

        <div className="form-container">

          <form
            className="service-form"

            onSubmit={
              handleAddService
            }
          >

            <h2>
              Add New Service
            </h2>

            {/* TITLE */}
            <input
              type="text"

              name="title"

              placeholder="Service Name"

              value={formData.title}

              onChange={handleChange}

              required
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"

              placeholder="Description"

              value={
                formData.description
              }

              onChange={handleChange}

              required
            />

            {/* PRICE */}
            <input
              type="number"

              name="price"

              placeholder="Price"

              value={formData.price}

              onChange={handleChange}

              required
            />

            {/* IMAGE */}
            <input
              type="text"

              name="image"

              placeholder="Image URL"

              value={formData.image}

              onChange={handleChange}
            />

            {/* CATEGORY */}
            <input
              type="text"

              name="category"

              placeholder="Category"

              value={
                formData.category
              }

              onChange={handleChange}
            />

            {/* BUTTON */}
            <button
              type="submit"

              className="submit-btn"
            >
              Add Service
            </button>

          </form>

        </div>
      )}

    </div>
  );
};

export default AdminDashboard;