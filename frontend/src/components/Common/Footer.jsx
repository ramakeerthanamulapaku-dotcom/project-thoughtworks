import "./Common.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COMPANY */}
        <div className="footer-section">
          <h2 className="footer-logo">LandEase</h2>

          <p>
            Smart land management platform for
            bookings, maintenance, and secure payments.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/feedback">Feedback</a></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-section">
          <h3>Services</h3>

          <ul>
            <li>Land Booking</li>
            <li>Maintenance</li>
            <li>Secure Payments</li>
            <li>Property Listings</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>Email: support@landease.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Bangalore, India</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 LandEase. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;