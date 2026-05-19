// src/pages/AdminDashboard.jsx

import { useState } from "react";
import axios from "axios";

import "./admindashboard.css";

const AdminDashboard = () => {

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ADD SERVICE
  const handleAddService =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(

            "https://landease.onrender.com/api/services",

            formData
          );

        alert(
          "Service Added Successfully ✅"
        );

        console.log(
          response.data
        );

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

      {/* SERVICES PAGE */}
      <div className="services-page">

        <h1>
          Services List
        </h1>

        <p>
          Manage all land
          maintenance services
        </p>

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

            {/* IMAGE URL */}
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