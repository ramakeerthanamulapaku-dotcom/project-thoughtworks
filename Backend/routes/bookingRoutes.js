const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  createBooking,

  getBookings,

  getBookingById,

  updateBookingStatus,

  deleteBooking,

} = require(
  "../controllers/bookingController"
);

// CREATE
router.post(
  "/",
  protect,
  createBooking
);

// GET ALL
router.get(
  "/",
  protect,
  getBookings
);

// GET SINGLE
router.get(
  "/:id",
  protect,
  getBookingById
);

// UPDATE
router.put(
  "/:id",
  protect,
  updateBookingStatus
);

// DELETE
router.delete(
  "/:id",
  protect,
  deleteBooking
);

module.exports = router;