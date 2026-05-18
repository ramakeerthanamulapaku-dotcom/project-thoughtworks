const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const Booking =
  require("../models/Booking");

// ==========================
// UPDATE WORKER LOCATION
// ==========================

router.put(

  "/update-location/:bookingId",

  protect,

  async (req, res) => {

    try {

      const {
        lat,
        lng,
      } = req.body;

      const booking =
        await Booking.findById(
          req.params.bookingId
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",

        });

      }

      booking.workerLocation = {
        lat,
        lng,
      };

      await booking.save();

      res.json({

        success: true,

        booking,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

// ==========================
// GET LOCATION
// ==========================

router.get(

  "/:bookingId",

  protect,

  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.bookingId
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",

        });

      }

      res.json({

        success: true,

        workerLocation:
          booking.workerLocation,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

module.exports = router;