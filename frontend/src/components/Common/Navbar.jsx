import { NavLink, Link } from "react-router-dom";
import "./Common.css";

function Navbar() {

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("userInfo");

    window.location.href = "/";

  };

  return (

    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        LandEase
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">

        {/* COMMON */}
        <li>
          <NavLink
            to="/"
            className="nav-item"
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/services"
            className="nav-item"
          >
            Services
          </NavLink>
        </li>

        {/* USER LINKS */}
        {user?.role === "user" && (
          <>
            <li>
              <NavLink
                to="/user-dashboard"
                className="nav-item"
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/user-my-bookings"
                className="nav-item"
              >
                Bookings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/track-worker"
                className="nav-item"
              >
                Track Worker
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/user-chat"
                className="nav-item"
              >
                Chat
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/user-payments"
                className="nav-item"
              >
                Payments
              </NavLink>
            </li>
          </>
        )}

        {/* WORKER LINKS */}
        {user?.role === "worker" && (
          <>
            <li>
              <NavLink
                to="/worker-dashboard"
                className="nav-item"
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/worker-assigned-jobs"
                className="nav-item"
              >
                Jobs
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/worker-update-status"
                className="nav-item"
              >
                Status
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/worker-live-tracking"
                className="nav-item"
              >
                Tracking
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/worker-chat"
                className="nav-item"
              >
                Chat
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/worker-earnings"
                className="nav-item"
              >
                Earnings
              </NavLink>
            </li>
          </>
        )}

        {/* ADMIN LINKS */}
        {user?.role === "admin" && (
          <>
            <li>
              <NavLink
                to="/admin-dashboard"
                className="nav-item"
              >
                Admin
              </NavLink>
            </li>
          </>
        )}

      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-buttons">

        {/* IF NOT LOGGED IN */}
        {!user ? (
          <>
            <NavLink to="/login">
              <button className="login-btn">
                Login
              </button>
            </NavLink>

            <NavLink to="/register">
              <button className="signup-btn">
                Sign Up
              </button>
            </NavLink>
          </>
        ) : (

          <>
            {/* PROFILE */}
            <Link to="/profile">

              <img
                src={
                  user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }

                alt="profile"

                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "15px",
                  border:
                    "2px solid #22c55e",
                }}
              />

            </Link>

            {/* LOGOUT */}
            <button
              className="signup-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;