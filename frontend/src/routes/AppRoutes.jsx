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




import UserDashboard from "../pages/user/UserDashboard";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ProtectedRoute from "../components/Common/ProtectedRoute";
// SERVICES
import ServicesPage
from "../pages/Services";

import ServiceDetails
from "../components/Services/ServiceDetails";

// BOOKING
import BookingPage
from "../pages/BookingPage";

// PAYMENT


// MAINTENANCE
import MaintenancePage
from "../pages/MaintenancePage";

// PROFILE
import Profile
from "../pages/Profile";

import EditProfile
from "../pages/EditProfile";

// ERROR
import ErrorMessage
from "../components/Common/ErrorMessage";

import BookService from "../pages/user/BookService";
import MyBookings from "../pages/user/Mybookings";
import TrackWorker from "../pages/user/TrackWorker";
import PaymentPage from "../pages/user/Payments";
import MaintenanceRequests from "../pages/user/MaintenanceRequests";
import Payments from "../pages/user/Payments";
import Reviews from "../pages/user/Reviews";  
import UserChat from "../pages/user/UserChat";
import AssignedJobs from "../pages/worker/AssignedJobs";
import UpdateStatus from "../pages/worker/UpdateStatus";
import WorkerTracking from "../pages/worker/WorkerTracking";
import WorkerEarnings from "../pages/worker/WorkerEarnings";
import WorkerChat from "../pages/worker/WorkerChat";


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

      

        
       

         {/* USER ROUTES */}

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* WORKER ROUTES */}

        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["worker"]}
            >
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-service"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <BookService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-my-bookings"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/track-worker"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <TrackWorker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-maintenance-requests"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <MaintenanceRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-payments"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-reviews"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-chat"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <UserChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker-assigned-jobs"
          element={
            <ProtectedRoute
              allowedRoles={["worker"]}
            >
              <AssignedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker-update-status/:id"
          element={
            <ProtectedRoute
              allowedRoles={["worker"]}
            >
              <UpdateStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker-live-tracking"
          element={
            <ProtectedRoute
              allowedRoles={["worker"]}
            >
              <WorkerTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker-earnings"
          element={
            <ProtectedRoute
              allowedRoles={["worker"]}
            >
              <WorkerEarnings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/worker-chat"
  element={
    <ProtectedRoute allowedRoles={["worker"]}>
      <WorkerChat />
    </ProtectedRoute>
  }
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
          element={<Payments />}
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
       <Route
  path="/edit-profile"
  element={<EditProfile />}
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