import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Common.css";

function Sidebar() {

  // GET USER FROM REDUX
  const { user } = useSelector((state) => state.auth);

  // ROLE
  const role = user?.role;

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        LandEase
      </div>

      {/* NAVIGATION */}
      <div className="sidebar-menu">

        {/* COMMON */}
        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>

        {/* CUSTOMER ROUTES */}
        {role === "user" && (
          <>
            <NavLink to="/dashboard" className="sidebar-link">
              Dashboard
            </NavLink>

            <NavLink to="/services" className="sidebar-link">
              Services
            </NavLink>

            <NavLink to="/bookings" className="sidebar-link">
              Bookings
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
          </>
        )}

        {/* WORKER ROUTES */}
        {role === "worker" && (
          <>
            <NavLink to="/worker-dashboard" className="sidebar-link">
              Worker Dashboard
            </NavLink>

            <NavLink to="/maintenance" className="sidebar-link">
              Maintenance Tasks
            </NavLink>

            <NavLink to="/assigned-work" className="sidebar-link">
              Assigned Work
            </NavLink>

            <NavLink to="/worker-earnings" className="sidebar-link">
              Earnings
            </NavLink>
          </>
        )}

        

      </div>
    </div>
  );
}

export default Sidebar;