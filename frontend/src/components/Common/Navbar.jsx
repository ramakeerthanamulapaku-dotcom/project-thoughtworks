import "./Common.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">LandEase</h1>

      <ul className="nav-links">
        <li>Home</li>
        <li>Properties</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>

      <button className="login-btn">Login</button>
    </nav>
  );
}

export default Navbar;