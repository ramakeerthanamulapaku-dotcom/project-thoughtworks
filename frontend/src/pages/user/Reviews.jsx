import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const Reviews = () => {
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
          color: "#111827",
        }}
      >
        <h1>Reviews</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Give feedback for completed services.
        </p>

        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Write a Review</h2>

          <form style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
            <select style={inputStyle}>
              <option>Select Completed Service</option>
              <option>Land Cleaning</option>
              <option>Fencing</option>
              <option>Watering</option>
            </select>

            <select style={inputStyle}>
              <option>Select Rating</option>
              <option>⭐ 1</option>
              <option>⭐⭐ 2</option>
              <option>⭐⭐⭐ 3</option>
              <option>⭐⭐⭐⭐ 4</option>
              <option>⭐⭐⭐⭐⭐ 5</option>
            </select>

            <textarea
              placeholder="Write your feedback..."
              rows="5"
              style={inputStyle}
            />

            <button style={buttonStyle}>Submit Review</button>
          </form>
        </div>
      </div>
    </>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
};

const buttonStyle = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Reviews;