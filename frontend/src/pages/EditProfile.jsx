import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Common/Footer";
import "./profile.css";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data)
      );

      localStorage.setItem("token", res.data.token);

      alert("Profile updated successfully");

      window.location.href = "/profile";
    } catch (error) {
      console.log(error);
      alert("Profile update failed");
    }
  };

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-layout">
        <Sidebar />

        <div className="profile-content">
          <div className="profile-card">
            <h1>Edit Profile</h1>

            <form onSubmit={handleUpdate}>
              <div className="detail-box">
                <h3>Full Name</h3>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="detail-box">
                <h3>Phone</h3>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="detail-box">
                <h3>Address</h3>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  rows="4"
                />
              </div>

              <button
                className="edit-profile-btn"
                type="submit"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EditProfile;