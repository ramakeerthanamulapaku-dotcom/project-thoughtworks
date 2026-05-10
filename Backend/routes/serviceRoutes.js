const express = require("express");
const router = express.Router();

const {
  getServices,
  getServiceById,
  createService,
  searchServices,
    updateService,
    deleteService
} = require("../controllers/serviceController");

// 👉 Get all services
router.get("/", getServices);

// 👉 Get single service
router.get("/:id", getServiceById);

// 👉 Add new service (admin)
router.post("/", createService);

router.get("/search", searchServices);

module.exports = router; // ✅ VERY IMPORTANT