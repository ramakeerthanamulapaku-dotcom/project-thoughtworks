const mongoose = require("mongoose");

const bookingSchema =
  new mongoose.Schema(

    {

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      serviceId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Service",

        required: true,

      },

      workerId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null,

      },

      fullName: {

        type: String,

      },

      phone: {

        type: String,

      },

      address: {

        type: String,

      },

      date: {

        type: String,

        required: true,

      },

      time: {

        type: String,

        required: true,

      },

      status: {

        type: String,

        enum: [
          "pending",
          "accepted",
          "completed",
          "cancelled",
        ],

        default: "pending",

      },

    },
  {
    workerNote: {
  type: String,
  default: "",
},
  },



    {

      timestamps: true,

    },

    workerLocation = {

  lat: {
    type: Number,
    default: 0,
  },

  lng: {
    type: Number,
    default: 0,
  },

},

paymentStatus = {
  type: String,
  default: "pending",
},



  );

module.exports =
  mongoose.model(
    "Booking",
    bookingSchema
  );