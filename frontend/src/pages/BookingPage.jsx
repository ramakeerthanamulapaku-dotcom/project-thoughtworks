import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../redux/thunks/bookingThunk";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [roomType, setRoomType] = useState("Single");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.booking);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(createBooking({ roomType, checkIn, checkOut }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/payment");
    }
  };

  return (
    <div className="page">
      <h2>Book a Room</h2>
      <form className="form" onSubmit={submitHandler}>
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Deluxe">Deluxe</option>
        </select>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button type="submit">{loading ? "Booking..." : "Submit Booking"}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default BookingPage;