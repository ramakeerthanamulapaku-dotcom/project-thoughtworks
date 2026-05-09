const AdminDashboard = () => {
  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <div className="grid">
        <div className="card">Total Users</div>
        <div className="card">Total Bookings</div>
        <div className="card">Pending Payments</div>
        <div className="card">Maintenance Requests</div>
      </div>
    </div>
  );
};

export default AdminDashboard;