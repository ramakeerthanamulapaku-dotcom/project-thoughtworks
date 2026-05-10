const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments,
} = require("../controllers/paymentController");

// 👉 ADD THIS DEBUG ROUTE HERE
router.get("/", (req, res) => {
  res.send("Payment API working");
});

// POST payment
router.post("/", createPayment);

// GET all payments
router.get("/all", getPayments);

module.exports = router;