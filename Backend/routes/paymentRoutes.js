const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  createPayment,

  getPayments,

  getPaymentById,

  createRazorpayOrder,

  verifyRazorpayPayment,

} = require(
  "../controllers/paymentController"
);

// CREATE PAYMENT
router.post(
  "/",
  protect,
  createPayment
);

// USER PAYMENTS
router.get(
  "/",
  protect,
  getPayments
);

// SINGLE PAYMENT
router.get(
  "/:id",
  protect,
  getPaymentById
);

// RAZORPAY ORDER
router.post(
  "/create-order",
  protect,
  createRazorpayOrder
);

// VERIFY PAYMENT
router.post(
  "/verify-payment",
  protect,
  verifyRazorpayPayment
);

module.exports = router;