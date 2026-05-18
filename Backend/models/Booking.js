const mongoose =
require("mongoose");

const bookingSchema =
new mongoose.Schema(

  {

    userId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },


    workerId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      default: null,
    },

    serviceId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Service",
},


    serviceName: {

      type: String,


      
      required: true,
    },


    fullName: {

      type: String,

      required: true,
    },


    phone: {

      type: String,

      required: true,
    },


    address: {

      type: String,

      required: true,
    },


    city: {

      type: String,
    },


    pincode: {

      type: String,
    },


    landmark: {

      type: String,
    },


    bookingDate: {

      type: String,

      required: true,
    },


    bookingTime: {

      type: String,

      required: true,
    },


    notes: {

      type: String,

      default: "",
    },


    location: {

      latitude: {

        type: Number,

        default: 0,
      },

      longitude: {

        type: Number,

        default: 0,
      },
    },


    workerLocation: {

      lat: {

        type: Number,

        default: 0,
      },

      lng: {

        type: Number,

        default: 0,
      },
    },


    workerNote: {

      type: String,

      default: "",
    },


    paymentStatus: {

      type: String,

      enum: [
        "pending",
        "paid",
        "failed",
      ],

      default: "pending",
    },


    status: {

      type: String,

      enum: [

        "pending",

        "accepted",

        "working",

        "completed",

        "cancelled",

        "rejected",
      ],

      default: "pending",
    },

  },

  {

    timestamps: true,
  }
);

module.exports =
mongoose.model(
  "Booking",
  bookingSchema
);