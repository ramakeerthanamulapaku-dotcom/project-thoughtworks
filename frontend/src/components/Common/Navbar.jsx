import { NavLink } from "react-router-dom";
import "./Common.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        LandEase
      </div>

      {/* LINKS */}
      <ul className="nav-links">

        <li>
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" className="nav-item">
            Services
          </NavLink>
        </li>

        <li>
          <NavLink to="/reviews" className="nav-item">
            Reviews
          </NavLink>
        </li>

        <li>
          <NavLink to="/feedback" className="nav-item">
            Feedback
          </NavLink>
        </li>

      </ul>

      {/* AUTH BUTTONS */}
      <div className="nav-buttons">

        <NavLink to="/login">
          <button className="login-btn">Login</button>
        </NavLink>

        <NavLink to="/register">
          <button className="signup-btn">Sign Up</button>
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;