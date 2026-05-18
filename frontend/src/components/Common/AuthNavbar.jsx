import { Link } from "react-router-dom";

import "./authNavbar.css";

function AuthNavbar() {

  return (

    <nav className="auth-navbar">

      <h2 className="logo">
        LandEase
      </h2>

      <Link
        to="/"
        className="back-btn"
      >
        Home
      </Link>

    </nav>
  );
}

export default AuthNavbar;