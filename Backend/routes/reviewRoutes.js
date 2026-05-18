const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  createReview,
  getCompletedBookings,
} = require(
  "../controllers/reviewController"
);

router.post(
  "/create",
  protect,
  createReview
);

router.get(
  "/completed",
  protect,
  getCompletedBookings
);

module.exports =
  router;