const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");


// GET worker assigned jobs
router.get("/bookings", authMiddleware, async (req, res) => {
  try {

    const bookings = await Booking.find({
      workerId: req.user.id,
    })
      .populate("userId", "name email")
      .populate("serviceId", "title");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE booking status
router.patch(
  "/bookings/:id/status",
  authMiddleware,
  async (req, res) => {

    try {

      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      booking.status = req.body.status;

      await booking.save();

      res.json({
        message: "Status updated",
        booking,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}
);
  


  router.get(
  "/bookings/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        ).populate(
          "userId",
          "name email"
        );

      if (!booking) {

        return res.status(404).json({
          message: "Booking not found",
        });
      }

      res.json(booking);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);


module.exports = router;