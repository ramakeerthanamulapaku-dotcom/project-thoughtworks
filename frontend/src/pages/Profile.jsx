import { useEffect, useState } from "react";

import API from "../services/api";



import Navbar
from "../components/Common/Navbar";

import Sidebar
from "../components/Common/Sidebar";

import Footer
from "../components/Common/Footer";

import "./profile.css";



function Profile() {

  // AUTH USER
  const user =
  JSON.parse(
    localStorage.getItem("userInfo")
  );

  // PROFILE STATE
  const [profile, setProfile] =
    useState(null);

  // FETCH PROFILE
  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const config = {

            headers: {

              Authorization:
                `Bearer ${user?.token}`,

            },

          };

          const res =
            await API.get("/auth/profile", config);

          setProfile(res.data);

        } catch (error) {

          console.log(error);

        }

      };

    if (user?.token) {

      fetchProfile();

    }

  }, [user]);

  // LOADING
  if (!profile) {

    return <h2>Loading...</h2>;

  }

  console.log("PROFILE PAGE UPDATED");

  return (

    <div className="profile-page">

      <Navbar />

      <div className="profile-layout">

        <Sidebar />

        <div className="profile-content">

          {/* HEADER */}
          <div className="profile-header">

            <h1>
              My Profile
            </h1>

            <p>
              Welcome back,
              {profile.name}
            </p>
          
          


          </div>

          {/* CARD */}
          <div className="profile-card">
          
           <button
    style={{
      background: "#22c55e",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      marginBottom: "20px",
      cursor: "pointer",
    }}
    onClick={() => {
      window.location.href = "/edit-profile";
    }}
  >
    Edit Profile
  </button>
  
            {/* IMAGE */}
            <div className="profile-image">

              <img
                src={
                  profile.profilePic||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5fUq6ZKoRn_BTE9RYCZIBg6OUljy6OOtCg&s"
                }
                alt="profile"
              />

            </div>

            {/* DETAILS */}
            <div className="profile-details">

              <div className="detail-box">

                <h3>
                  Full Name
                </h3>

                <p>
                  {profile.name}
                </p>

              </div>

              <div className="detail-box">

                <h3>
                  Email
                </h3>

                <p>
                  {profile.email}
                </p>

              </div>

              <div className="detail-box">

                <h3>
                  Phone
                </h3>

                <p>
                  {profile.phone}
                </p>

              </div>

              <div className="detail-box">

                <h3>
                  Address
                </h3>

                <p>
                  {profile.address}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Profile;