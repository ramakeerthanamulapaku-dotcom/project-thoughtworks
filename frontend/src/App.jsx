import React from "react";

import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Common/Sidebar";



function App() {
  return (
    <div className="app-layout">
     
     
      
      <div className="app-content">
        <AppRoutes />
      </div>
      
    </div>
  );
};

export default App;