import React from "react";
import "./Dashboard.css";

const RecentBooking = ({ bookings = [] }) => {
  return (
    <div className="recent-booking">
      <h3>Recent Bookings</h3>

      {bookings.length === 0 ? (
        <p className="empty">No recent bookings yet</p>
      ) : (
        <ul>
          {bookings.map((item, index) => (
            <li key={index} className="booking-item">
              <div>
                <h4>{item.title}</h4>
                <p>{item.location}</p>
              </div>

              <span className={`status ${item.status}`}>
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentBooking;