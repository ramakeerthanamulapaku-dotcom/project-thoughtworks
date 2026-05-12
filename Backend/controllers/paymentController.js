const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE RAZORPAY ORDER
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("RAZORPAY ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// VERIFY RAZORPAY PAYMENT
const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      bookingId,
      userId,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const payment = new Payment({
      bookingId,
      userId,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      status: "paid",
      method: "razorpay",
    });

    const savedPayment = await payment.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: savedPayment,
    });
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// OLD CREATE PAYMENT
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
  createRazorpayOrder,
  verifyRazorpayPayment,
};