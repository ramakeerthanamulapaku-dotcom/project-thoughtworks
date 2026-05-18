import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import {

  LayoutDashboard,

  Wrench,

  CalendarCheck,

  CreditCard,

  Star,

  MessageSquare,

  Briefcase,

  ClipboardList,

  IndianRupee,

  UserCircle,

} from "lucide-react";

import "./Common.css";

function Sidebar() {

  // GET USER
  const { user } =
    useSelector(
      (state) => state.auth
    );

  // ROLE
  const role =
    user?.role||
    JSON.parse(localStorage.getItem("userInfo"))
      ?.role;

  return (

    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">

        <div className="logo-circle">
          L
        </div>

        <h2>
          LandEase
        </h2>

      </div>

      {/* MENU */}
      <div className="sidebar-menu">

        {/* PROFILE */}
        <NavLink
          to="/profile"
          className="sidebar-link"
        >

          <UserCircle size={20} />

          <span>
            Profile
          </span>

        </NavLink>

        {/* USER ROUTES */}
        {role === "user" && (
          <>

            <NavLink
              to="/user-dashboard"
              className="sidebar-link"
            >

              <LayoutDashboard size={20} />

              <span>
                Dashboard
              </span>

            </NavLink>

            <NavLink
              to="/services"
              className="sidebar-link"
            >

              <Wrench size={20} />

              <span>
                Services
              </span>

            </NavLink>

            <NavLink
              to="/user-my-bookings"
              className="sidebar-link"
            >

              <CalendarCheck size={20} />

              <span>
                Bookings
              </span>

            </NavLink>

            <NavLink
              to="/user-payments"
              className="sidebar-link"
            >

              <CreditCard size={20} />

              <span>
                Payments
              </span>

            </NavLink>

            <NavLink
              to="/user-reviews"
              className="sidebar-link"
            >

              <Star size={20} />

              <span>
                Reviews
              </span>

            </NavLink>

            
          </>
        )}

        {/* WORKER ROUTES */}
        {role === "worker" && (
          <>

            <NavLink
              to="/worker-dashboard"
              className="sidebar-link"
            >

              <LayoutDashboard size={20} />

              <span>
                Dashboard
              </span>

            </NavLink>

            <NavLink
              to="/maintenance"
              className="sidebar-link"
            >

              <ClipboardList size={20} />

              <span>
                Complaints
              </span>

            </NavLink>

            <NavLink
              to="/worker-assigned-jobs"
              className="sidebar-link"
            >

              <Briefcase size={20} />

              <span>
                Assigned Work
              </span>

            </NavLink>

            <NavLink
              to="/worker-earnings"
              className="sidebar-link"
            >

              <IndianRupee size={20} />

              <span>
                Earnings
              </span>

            </NavLink>

          </>
        )}

      </div>

    </div>

  );

}

export default Sidebar;