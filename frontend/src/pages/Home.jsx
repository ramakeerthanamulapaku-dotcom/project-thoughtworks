import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page home-page">
      <h1>Hostel Management System</h1>
      <p>Manage bookings, payments, services, and maintenance in one place.</p>
      <div className="btn-group">
        <Link to="/booking" className="btn">Book Room</Link>
        <Link to="/services" className="btn">Services</Link>
      </div>
    </div>
  );
};

export default Home;