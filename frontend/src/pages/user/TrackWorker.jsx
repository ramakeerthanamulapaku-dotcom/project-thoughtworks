import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const TrackWorker = () => {
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
        <h1
          style={{
            color: "#111827",
            marginBottom: "10px",
          }}
        >
          Track Worker
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Track your assigned worker in real time.
        </p>

        {/* BOOKING INFO */}
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            marginBottom: "25px",
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Booking Details</h2>

          <p>
            Service:
            <strong>
              {" "}
              Land Cleaning
            </strong>
          </p>

          <p>
            Worker:
            <strong>
              {" "}
              Ravi Kumar
            </strong>
          </p>

          <p>
            Status:
            <strong
              style={{
                color: "#16a34a",
              }}
            >
              {" "}
              On The Way
            </strong>
          </p>
        </div>

        {/* MAP AREA */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              height: "500px",
              width: "100%",
              background:
                "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#1e3a8a",
              fontWeight: "600",
            }}
          >
            Google Maps Tracking Here 📍
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackWorker;