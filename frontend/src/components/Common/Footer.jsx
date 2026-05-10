import "./Common.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>LandEase</h2>
        <p>Buy and sell lands easily without middlemen.</p>

        <div className="footer-links">
          <span>Home</span>
          <span>Properties</span>
          <span>Contact</span>
        </div>

        <p className="copyright">
          © 2026 LandEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;