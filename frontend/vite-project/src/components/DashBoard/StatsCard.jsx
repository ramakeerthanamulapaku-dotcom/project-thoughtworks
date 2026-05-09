import React from "react";
import "./Dashboard.css";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="stats-icon" style={{ color }}>
        {icon}
      </div>

      <div className="stats-info">
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;