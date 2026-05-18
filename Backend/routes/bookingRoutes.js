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

  getUserBookings,

  getPendingBookings,

  getWorkerBookings,

  acceptBooking,

  rejectBooking,

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

router.get(
  "/worker",
  protect,
  getWorkerBookings
)



// GET PENDING BOOKINGS
router.get(
  "/pending",
  protect,
  getPendingBookings
);

router.put(
  "/:id/status",
  protect,
  updateBookingStatus
);

router.get(
  "/:id",
  protect,
  getBookingById
);  


// GET USER BOOKINGS
router.get(
  "/user/:userID",
  protect,
  getUserBookings
);





// ACCEPT BOOKING
router.put(
  "/:id/accept",
  protect,
  acceptBooking
);


// REJECT BOOKING
router.put(
  "/:id/reject",
  protect,
  rejectBooking
);


// DELETE
router.delete(
  "/:id",
  protect,
  deleteBooking
);

module.exports = router;