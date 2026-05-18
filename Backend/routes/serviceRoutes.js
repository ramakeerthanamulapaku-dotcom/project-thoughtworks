const express = require("express");

const router = express.Router();

const {
  getServices,
  getServiceById,
  createService,
  searchServices,
  updateService,
  deleteService,
} = require(
  "../controllers/serviceController"
);

// SEARCH
router.get(
  "/search",
  searchServices
);

// GET ALL
router.get(
  "/",
  getServices
);

// GET SINGLE
router.get(
  "/:id",
  getServiceById
);

// CREATE
router.post(
  "/",
  createService
);

// UPDATE
router.put(
  "/:id",
  updateService
);

// DELETE
router.delete(
  "/:id",
  deleteService
);

module.exports = router;