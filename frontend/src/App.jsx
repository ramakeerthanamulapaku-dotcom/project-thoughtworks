import React from "react";
import Sidebar from "./components/Common/Sidebar";
import AppRoutes from "./routes/AppRoutes";

import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      
      <div className="app-content">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;