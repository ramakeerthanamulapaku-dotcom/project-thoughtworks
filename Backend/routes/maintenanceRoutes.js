const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  createMaintenance,

  getMaintenance,

  getMaintenanceById,

  updateMaintenanceStatus,

  deleteMaintenance,

} = require(
  "../controllers/maintenanceController"
);

// CREATE
router.post(
  "/",
  protect,
  createMaintenance
);

// GET USER REQUESTS
router.get(
  "/",
  protect,
  getMaintenance
);

// GET SINGLE
router.get(
  "/:id",
  protect,
  getMaintenanceById
);

// UPDATE STATUS
router.put(
  "/:id",
  protect,
  updateMaintenanceStatus
);

// DELETE
router.delete(
  "/:id",
  protect,
  deleteMaintenance
);

module.exports = router;