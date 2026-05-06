const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  amount: Number,
  status: String
});

module.exports = mongoose.model("Payment", PaymentSchema);