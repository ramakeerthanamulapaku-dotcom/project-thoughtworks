const mongoose = require("mongoose");

const serviceSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },

    category: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =
  mongoose.model(
    "Service",
    serviceSchema
  );