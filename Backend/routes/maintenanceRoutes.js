const express = require("express");
const router = express.Router();

const {
  createMaintenance,
  getMaintenance,
  updateMaintenanceStatus,
} = require("../controllers/maintenanceController");

// DEBUG ROUTE
router.get("/", (req, res) => {
  res.send("Maintenance API working");
});

// CREATE
router.post("/", createMaintenance);

// GET ALL
router.get("/all", getMaintenance);

// UPDATE STATUS
router.put("/:id", updateMaintenanceStatus);

module.exports = router;