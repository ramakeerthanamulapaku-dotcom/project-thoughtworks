import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* =========================
   PAGES
========================= */

// HOME
import Home from "../pages/Home";

// AUTH
import Login from "../pages/Login";
import RegisterPage from "../pages/Register";
import ForgotPassword
from "../pages/ForgotPassword";

// DASHBOARD
import Dashboard
from "../components/DashBoard/Dashboard";

import AdminDashboard
from "../pages/AdminDashboard";

// SERVICES
import ServicesPage
from "../pages/Services";

import ServiceDetails
from "../components/services/ServiceDetails";

// BOOKING
import BookingPage
from "../pages/BookingPage";

// PAYMENT
import PaymentPage
from "../pages/PaymentPage";

// MAINTENANCE
import MaintenancePage
from "../pages/MaintenancePage";

// PROFILE
import Profile
from "../pages/Profile";

// ERROR
import ErrorMessage
from "../components/Common/ErrorMessage";

function AppRoutes() {

  return (

    

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* SERVICES */}
        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />

        {/* BOOKING */}
        <Route
          path="/booking"
          element={<BookingPage />}
        />

        {/* PAYMENT */}
        <Route
          path="/payments"
          element={<PaymentPage />}
        />

        {/* MAINTENANCE */}
        <Route
          path="/maintenance"
          element={<MaintenancePage />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ERROR */}
        <Route
          path="*"
          element={
            <ErrorMessage
              message="Page Not Found"
            />
          }
        />

      </Routes>

    
  );
}

export default AppRoutes;