const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  date: String,
  time: String,
  status: {
    type: String,
    default: "pending"
  },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Booking", BookingSchema);