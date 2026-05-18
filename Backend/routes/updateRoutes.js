const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  addUpdate,

  getUpdates,

  deleteUpdate,

} = require(
  "../controllers/updateController"
);

// ADD UPDATE
router.post(
  "/",
  protect,
  addUpdate
);

// GET BOOKING UPDATES
router.get(
  "/:bookingId",
  protect,
  getUpdates
);

// DELETE UPDATE
router.delete(
  "/:id",
  protect,
  deleteUpdate
);

module.exports = router;