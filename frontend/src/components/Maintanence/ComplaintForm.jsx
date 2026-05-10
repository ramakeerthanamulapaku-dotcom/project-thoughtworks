import React, { useState } from "react";
import "./Complaint.css";

const ComplaintForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!formData.title || !formData.description || !formData.category) {
      return "All fields are required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    setError("");
    setLoading(true);

    try {
      // 🔥 backend ready hook
      console.log("Complaint submitted:", formData);

      if (onSubmit) onSubmit(formData);

      setFormData({ title: "", description: "", category: "" });
      alert("Complaint submitted 🚀");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-container">
      <div className="complaint-card">
        <h2>Raise a Complaint</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Complaint Title"
            value={formData.title}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="maintenance">Maintenance</option>
            <option value="payment">Payment</option>
            <option value="land_issue">Land Issue</option>
          </select>

          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={formData.description}
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          <button disabled={loading}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;