const Payment = require("../models/Payment");

// CREATE PAYMENT
const createPayment = async (req, res) => {
  try {
    console.log("PAYMENT HIT");
    console.log(req.body);

    const payment = new Payment(req.body);

    const savedPayment = await payment.save();

    res.status(201).json({
      message: "Payment created successfully",
      data: savedPayment,
    });

  } catch (error) {
    console.log("PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Payment failed",
      error: error.message,
    });
  }
};

// GET PAYMENTS
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json(payments);

  } catch (error) {
    console.log("GET PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPayments,
};