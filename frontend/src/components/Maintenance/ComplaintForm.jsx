import {
  useState,
} from "react";

import API from "../../services/api";
import "./Maintanence.css";


const ComplaintForm = () => {

  const token =
    localStorage.getItem("token");


  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      location: "",

      priority: "Medium",
    });


  const [loading, setLoading] =
    useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      await API.post("/maintenance", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      alert(
        "Maintenance request submitted"
      );


      setFormData({
        title: "",

        description: "",

        location: "",

        priority: "Medium",
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  return (

    <form
      onSubmit={handleSubmit}
      className="complaint-form"
    >

      <h2>
        Maintenance Complaint
      </h2>


      <input
        type="text"

        name="title"

        placeholder="Complaint Title"

        value={formData.title}

        onChange={handleChange}

        required
      />


      <textarea
        name="description"

        placeholder="Describe the issue"

        rows="5"

        value={formData.description}

        onChange={handleChange}

        required
      />


      <input
        type="text"

        name="location"

        placeholder="Enter Location"

        value={formData.location}

        onChange={handleChange}

        required
      />


      <select
        name="priority"

        value={formData.priority}

        onChange={handleChange}
      >

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


      <button type="submit">
        {
          loading
            ? "Submitting..."
            : "Submit Request"
        }
      </button>

    </form>
  );
};

export default ComplaintForm;


