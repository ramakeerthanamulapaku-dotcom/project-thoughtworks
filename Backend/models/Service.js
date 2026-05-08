const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageurl: String
});

module.exports = mongoose.model("Service", ServiceSchema);