import Navbar from "../components/Common/Navbar";

import Footer from "../components/Common/Footer";

import RegisterForm from "../components/Auth/RegisterForm";

import "./authPages.css";

function RegisterPage() {

  return (

    <div className="auth-page">

      {/* NAVBAR */}
      <Navbar />

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

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default RegisterPage;