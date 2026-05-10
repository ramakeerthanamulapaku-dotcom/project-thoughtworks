import Navbar from "../components/Common/Navbar";

import Footer from "../components/Common/Footer";

import LoginForm from "../components/Auth/LoginForm";

import "./authPages.css";

function Login() {

  return (

    <div className="auth-page">

      {/* NAVBAR */}
      <Navbar />

      {/* LOGIN SECTION */}
      <div className="auth-container">

        <div className="auth-left">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to access bookings,
            services, payments and
            maintenance requests.
          </p>

        </div>

        {/* FORM */}
        <div className="auth-right">

          <LoginForm />

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Login;