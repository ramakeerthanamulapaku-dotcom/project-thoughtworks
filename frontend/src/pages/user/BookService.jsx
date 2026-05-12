import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const BookService = () => {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          padding: "110px 40px 40px",
          minHeight: "100vh",
          background: "#f8fafc",
        }}
      >
        <h1>Book Services</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Select a land maintenance service and book it.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            "Land Cleaning",
            "Land Leveling",
            "Fencing",
            "Watering",
            "Pest Control",
            "Soil Maintenance",
          ].map((service) => (
            <div
              key={service}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <h3>{service}</h3>

              <p style={{ color: "#64748b", margin: "12px 0" }}>
                Professional {service.toLowerCase()} service for your land.
              </p>

              <button
                style={{
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookService;