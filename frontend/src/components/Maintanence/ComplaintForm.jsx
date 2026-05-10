import { useState } from "react";
import "./maintenance.css";

function ComplaintForm() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    priority: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Complaint Submitted:", formData);

    alert("Complaint Submitted Successfully");

    // RESET FORM
    setFormData({
      title: "",
      description: "",
      location: "",
      priority: "",
    });

  };

  return (

    <div className="complaint-container">

      <div className="complaint-box">

        <h2>Maintenance Complaint</h2>

        <p>
          Raise maintenance issues quickly
        </p>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Describe the issue"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* PRIORITY */}
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Priority
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>

          {/* BUTTON */}
          <button type="submit">
            Submit Complaint
          </button>

        </form>

      </div>

    </div>
  );
}

export default ComplaintForm;