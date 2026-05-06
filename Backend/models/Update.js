const mongoose = require("mongoose");

const UpdateSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  imageUrl: String,
  message: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Update", UpdateSchema);