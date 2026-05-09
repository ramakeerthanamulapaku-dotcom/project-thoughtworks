import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Find Your Perfect Land</h1>
        <p>Buy and sell lands easily with LandEase</p>

        <button>Explore Lands</button>
      </div>

      <Footer />
    </>
  );
}

export default Home;