import { NavLink } from "react-router-dom";
import "./Common.css";

function Sidebar() {
  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        LandEase
      </div>

      {/* NAVIGATION */}
      <div className="sidebar-menu">

        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/services" className="sidebar-link">
          Services
        </NavLink>

        <NavLink to="/bookings" className="sidebar-link">
          Bookings
        </NavLink>

        <NavLink to="/maintenance" className="sidebar-link">
          Maintenance
        </NavLink>

        <NavLink to="/payments" className="sidebar-link">
          Payments
        </NavLink>

        <NavLink to="/reviews" className="sidebar-link">
          Reviews
        </NavLink>

        <NavLink to="/feedback" className="sidebar-link">
          Feedback
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;