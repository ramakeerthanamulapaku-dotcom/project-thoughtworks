import Navbar from "../components/Common/Navbar";

import Sidebar from "../components/Common/Sidebar";

import Footer from "../components/Common/Footer";

import ComplaintForm
from "../components/Maintenance/ComplaintForm";

import MaintenanceStatus
from "../components/Maintenance/MaintenanceStatus";

import "../components/Maintenance/Maintanence.css";

function MaintenancePage() {

  return (

    <div className="maintenance-page">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="maintenance-layout">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="maintenance-content">

          {/* HEADER */}
          <div className="maintenance-header">


          </div>

          {/* GRID */}
          <div className="maintenance-grid">

            {/* COMPLAINT FORM */}
            <div className="maintenance-card">

              <ComplaintForm />

            </div>

            {/* STATUS */}
            <div className="maintenance-card">

              <MaintenanceStatus />

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default MaintenancePage;