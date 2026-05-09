const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.send("Booking created");
};

const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("serviceId");
  res.json(bookings);
};

module.exports = {
  createBooking,
  getBookings,
};