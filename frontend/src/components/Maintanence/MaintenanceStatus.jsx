import React from "react";
import "./Maintenance.css";

const MaintenanceStatus = ({ requests = [] }) => {
  return (
    <div className="maintenance-container">
      <h2>Maintenance Status</h2>

      {requests.length === 0 ? (
        <p className="empty">No maintenance requests found</p>
      ) : (
        <div className="maintenance-list">
          {requests.map((item, index) => (
            <div key={index} className="maintenance-card">
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>

              <span className={`status ${item.status}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaintenanceStatus;