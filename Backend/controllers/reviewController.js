const Review =
  require("../models/Reviews");

const Booking =
  require("../models/Booking");

// ==========================
// CREATE REVIEW
// ==========================

const createReview =
  async (req, res) => {

    try {

      const {
        bookingId,
        rating,
        comment,
      } = req.body;

      const booking =
        await Booking.findById(
          bookingId
        );

      if (!booking) {

        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      // ONLY COMPLETED BOOKINGS

      if (
        booking.status !==
        "completed"
      ) {

        return res.status(400).json({
          message:
            "Service not completed",
        });
      }

      // CHECK ALREADY REVIEWED

      const existingReview =
        await Review.findOne({
          bookingId,
        });

      if (existingReview) {

        return res.status(400).json({
          message:
            "Review already submitted",
        });
      }

      const review =
        await Review.create({

          bookingId,

          userId:
            req.user._id,

          workerId:
            booking.workerId,

          rating,

          comment,
        });

      res.status(201).json(
        review
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }

  };


// ==========================
// GET USER REVIEWS
// ==========================

const getUserReviews =
  async (req, res) => {

    try {

      const reviews =
        await Review.find({

          userId:
            req.user._id,
        })

        .populate(
          "workerId",
          "name"
        )

        .sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        reviews,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
};
















// ==========================
// GET USER COMPLETED BOOKINGS
// ==========================

const getCompletedBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          userId:
            req.user._id,

          status:
            "completed",
        })

        .populate(
          "workerId",
          "name"
        )

        .sort({
          createdAt: -1,
        });

      res.json(bookings);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }

  };

module.exports = {

  createReview,

  getCompletedBookings,

  getUserReviews,
};