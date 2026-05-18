import Navbar from "../components/Common/Navbar";

import Footer from "../components/Common/Footer";

import SearchBar from "../components/Common/SearchBar";

import Services from "../components/Services/ServiceList";

import "./home.css";

function Home() {

  return (

    <div className="home-page">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-content">

          <h1>
           <span>Land Maintenance &</span>
           <br/>
            Property Services
          </h1>

          <p>
            Book trusted land services,
            maintenance, cleaning,
            electrical repairs and more.
          </p>

          {/* SEARCH BAR */}
          <SearchBar />

        </div>

      </section>

      {/* SERVICES */}
      <section className="services-section">

        <div className="section-title">

          <h2>
            Popular Services
          </h2>

          <p>
            Choose professional land
            services near you
          </p>

        </div>

        <Services />

      </section>

      {/* FEATURES */}
      <section className="features-section">

        <div className="feature-card">

          <h3>
            Trusted Workers
          </h3>

          <p>
            Verified professionals for
            quality work.
          </p>

        </div>

        <div className="feature-card">

          <h3>
            Fast Booking
          </h3>

          <p>
            Easy and quick booking
            process.
          </p>

        </div>

        <div className="feature-card">

          <h3>
            Secure Payments
          </h3>

          <p>
            Pay safely using UPI,
            PhonePe, Google Pay
            and cards.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Home;