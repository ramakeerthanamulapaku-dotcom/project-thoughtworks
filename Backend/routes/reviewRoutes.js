const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  createReview,
  getCompletedBookings,
  getUserReviews,
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

router.get(
  "/my-reviews",
  protect,
  getUserReviews
);




module.exports =
  router;