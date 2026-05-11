import Navbar from "../components/Common/Navbar";

import Sidebar from "../components/Common/Sidebar";

import Footer from "../components/Common/Footer";

import SearchBar from "../components/Common/SearchBar";

import Services from "../components/Services/ServiceList";

import "./servicesPages.css";

function ServicesPage() {

  return (

    <div className="services-page-wrapper">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="services-layout">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="services-content">

          {/* HEADER */}
          <div className="services-header-page">

            <h1>
              LandEase Services
            </h1>

            <p>
              Explore professional
              land maintenance and
              property services
            </p>

          </div>

          {/* SEARCH BAR */}
          <SearchBar />

          {/* SERVICES */}
          <Services />

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default ServicesPage;