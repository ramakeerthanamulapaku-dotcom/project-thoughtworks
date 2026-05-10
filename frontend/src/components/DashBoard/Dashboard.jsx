import React from "react";
import StatsCard from "./StatsCard";
import RecentBooking from "./RecentBooking";

import { FaHome, FaUsers, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const bookings = [
    {
      title: "Farm Land Booking",
      location: "Nellore",
      status: "confirmed",
    },
    {
      title: "Plot Visit",
      location: "Hyderabad",
      status: "pending",
    },
  ];

  return (
    <div>
      {/* STATS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <StatsCard title="Total Lands" value="120" icon={<FaHome />} color="#6366f1" />
        <StatsCard title="Users" value="450" icon={<FaUsers />} color="#16a34a" />
        <StatsCard title="Growth" value="32%" icon={<FaChartLine />} color="#f59e0b" />
      </div>

      {/* BOOKINGS */}
      <div style={{ marginTop: "30px" }}>
        <RecentBooking bookings={bookings} />
      </div>
    </div>
  );
};

export default Dashboard;