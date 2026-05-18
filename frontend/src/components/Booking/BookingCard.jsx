import { useState } from "react";
import "./Booking.css";

function BookingCard() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="booking-card">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="land"
      />

      <div className="booking-info">
        <h2>Green Valley Plot</h2>

        <p>📍 Hyderabad</p>
        <p>₹ 25 Lakhs</p>

        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {showDetails && (
          <div className="land-details">
            <p>🌳 Area: 2400 sqft</p>
            <p>🛣 Road Access Available</p>
            <p>💧 Water Facility Available</p>
            <p>⚡ Electricity Available</p>
            <p>🚌 Nearby Transportation</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingCard;