

import { Link } from "react-router-dom";
import AuthNavbar from "../components/Common/AuthNavbar"; 

import RegisterForm from "../components/Auth/RegisterForm";

import "./authPages.css";

function RegisterPage() {

  return (

    <div className="auth-page">

     <AuthNavbar />

      

      {/* REGISTER SECTION */}
      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="auth-left">

          <h1>
            Create Your Account
          </h1>

          <p>
            Join LandEase to book
            maintenance services,
            track bookings and manage
            your property easily.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">

          <RegisterForm />

        </div>

      </div>

     

    </div>
  );
}

export default RegisterPage;