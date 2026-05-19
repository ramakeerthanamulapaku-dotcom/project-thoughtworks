const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  createPayment,

  getPayments,

  

 

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





module.exports = router;