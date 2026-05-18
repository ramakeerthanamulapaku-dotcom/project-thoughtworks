import React from "react";

import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Common/Sidebar";
import WorkerLocationTracker from "./components/Common/WorkerTrackLocation";


function App() {
  return (
    <div className="app-layout">
     
     <WorkerLocationTracker/>
      
      <div className="app-content">
        <AppRoutes />
      </div>
      
    </div>
  );
};

export default App;