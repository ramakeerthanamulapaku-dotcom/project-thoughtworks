const express = require("express");

const router = express.Router();

const {
  createPayment,
  getPayments,
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/paymentController");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Payment API working");
});

// NORMAL PAYMENT
router.post("/", createPayment);

// GET ALL PAYMENTS
router.get("/all", getPayments);

// CREATE RAZORPAY ORDER
router.post(
  "/create-order",
  createRazorpayOrder
);

// VERIFY PAYMENT
router.post(
  "/verify-payment",
  verifyRazorpayPayment
);

module.exports = router;