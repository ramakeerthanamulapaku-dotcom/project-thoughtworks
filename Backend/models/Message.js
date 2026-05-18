const mongoose =
  require("mongoose");

const messageSchema =
  new mongoose.Schema(

    {

      // BOOKING CONNECTION
      bookingId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Booking",

        required: true,

      },

      // SENDER
      senderId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      // RECEIVER
      receiverId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      // TEXT MESSAGE
      text: {

        type: String,

        trim: true,

        default: "",

      },

      // IMAGE MESSAGE
      image: {

        type: String,

        default: "",

      },

      // MESSAGE TYPE
      messageType: {

        type: String,

        enum: [
          "text",
          "image",
          "location",
        ],

        default: "text",

      },

      // READ STATUS
      isRead: {

        type: Boolean,

        default: false,

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(
    "Message",
    messageSchema
  );