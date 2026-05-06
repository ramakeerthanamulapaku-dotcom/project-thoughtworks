const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.send("Booking created");
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("serviceId");
  res.json(bookings);
};