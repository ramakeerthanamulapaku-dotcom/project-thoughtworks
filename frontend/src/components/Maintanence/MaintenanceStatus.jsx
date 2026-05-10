import "./maintenance.css";

function MaintenanceStatus() {

  // DUMMY DATA
  const complaints = [

    {
      id: 1,
      title: "Water Leakage",
      status: "Pending",
      priority: "High",
    },

    {
      id: 2,
      title: "Electrical Repair",
      status: "In Progress",
      priority: "Medium",
    },

    {
      id: 3,
      title: "Cleaning Service",
      status: "Completed",
      priority: "Low",
    },

  ];

  return (

    <div className="status-container">

      <h2 className="status-title">
        Maintenance Status
      </h2>

      <div className="status-grid">

        {complaints.map((item) => (

          <div
            key={item.id}
            className="status-card"
          >

            <h3>{item.title}</h3>

            <p>
              Priority:
              <span className="priority">
                {" "}
                {item.priority}
              </span>
            </p>

            <p>
              Status:
              <span
                className={`status-badge ${item.status}`}
              >
                {" "}
                {item.status}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MaintenanceStatus;