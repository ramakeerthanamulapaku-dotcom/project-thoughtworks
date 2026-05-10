import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector }
from "react-redux";

import Navbar
from "../components/Common/Navbar";

import Sidebar
from "../components/Common/Sidebar";

import Footer
from "../components/Common/Footer";



function Profile() {

  // AUTH USER
  const { user } =
    useSelector(
      (state) => state.auth
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
                `Bearer ${user.token}`,

            },

          };

          const res =
            await axios.get(
              "http://localhost:5000/api/auth/profile",
              config
            );

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

            {/* IMAGE */}
            <div className="profile-image">

              <img
                src={
                  profile.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
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