const mongoose =
  require("mongoose");

const reviewSchema =
  new mongoose.Schema(
    {
      bookingId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Booking",

        required: true,
      },

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
      },

      rating: {
        type: Number,

        required: true,
      },

      comment: {
        type: String,

        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Review",
    reviewSchema
  );