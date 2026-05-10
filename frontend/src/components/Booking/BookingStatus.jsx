import "./Booking.css";

function BookingStatus({ status }) {
  return (
    <div className={`booking-status ${status}`}>
      {status}
    </div>
  );
}

export default BookingStatus;