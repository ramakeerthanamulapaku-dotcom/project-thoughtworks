import React from "react";
import Sidebar from "./components/Common/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <Navbar />
      <div className="app-content">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;