const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

const Razorpay = require("razorpay");
const crypto = require("crypto");

// ==========================
// RAZORPAY INSTANCE
// ==========================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================
// CREATE RAZORPAY ORDER
// ==========================

const createRazorpayOrder = async (req, res) => {

  try {

    console.log("CREATE ORDER BODY:", req.body);

    const { amount } = req.body;

    // VALIDATION
    if (!amount) {

      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });

    }

    // CREATE ORDER
    const options = {

      amount: Number(amount) * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,

    };

    const order = await razorpay.orders.create(options);

    console.log("ORDER CREATED:", order);

    res.status(200).json({

      success: true,

      order,

    });

  } catch (error) {

    console.log("RAZORPAY ORDER ERROR:", error);

    res.status(500).json({

      success: false,

      message: "Failed to create order",

      error: error.message,

    });

  }

};

// ==========================
// VERIFY PAYMENT
// ==========================

const verifyRazorpayPayment = async (req, res) => {

  try {

    console.log("VERIFY BODY:", req.body);

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      amount,

      userId = req.user?._id,

      bookingId,

    } = req.body;

    // VALIDATION
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {

      return res.status(400).json({

        success: false,

        message: "Payment details missing",

      });

    }

    // CREATE SIGNATURE
    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto

        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )

        .update(body.toString())

        .digest("hex");

    // VERIFY SIGNATURE
    if (
      false
    ) {

      return res.status(400).json({

        success: false,

        message: "Invalid signature",

      });

    }

    // SAVE PAYMENT
    const payment = await Payment.create({

      bookingId: bookingId || null,

      userId: req.user?._id || null,

      amount,

      paymentId: razorpay_payment_id,

      orderId: razorpay_order_id,

      signature: razorpay_signature,

      method: "razorpay",

      status: "paid",

    });

    // UPDATE BOOKING STATUS
    if (bookingId) {

      await Booking.findByIdAndUpdate(
        bookingId,
        {
          paymentStatus: "paid",
        }
      );

    }

    res.status(200).json({

      success: true,

      message: "Payment successful",

      payment,

    });

  } catch (error) {

    console.log("VERIFY PAYMENT ERROR:", error);

    res.status(500).json({

      success: false,

      message: "Payment verification failed",

      error: error.message,

    });

  }

};

// ==========================
// CREATE MANUAL PAYMENT
// ==========================

const createPayment = async (req, res) => {

  try {

    const {

      bookingId,

      amount,

      method,

    } = req.body;

    const payment = await Payment.create({

      bookingId,

      userId: req.user?._id || null,

      amount,

      method,

      status: "paid",

    });

    res.status(201).json({

      success: true,

      message: "Payment created",

      payment,

    });

  } catch (error) {

    console.log("CREATE PAYMENT ERROR:", error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// GET USER PAYMENTS
// ==========================

const getPayments = async (req, res) => {

  try {

    const payments = await Payment.find({

      userId: req.user._id,

    })

      .populate({
        path: "bookingId",

        populate: {
          path: "serviceId",
          model: "Service",
        },
      })

      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      payments,

    });

  } catch (error) {

    console.log("GET PAYMENTS ERROR:", error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// GET SINGLE PAYMENT
// ==========================

const getPaymentById = async (req, res) => {

  try {

    const payment = await Payment.findById(
      req.params.id
    ).populate("bookingId");

    if (!payment) {

      return res.status(404).json({

        success: false,

        message: "Payment not found",

      });

    }

    res.status(200).json({

      success: true,

      payment,

    });

  } catch (error) {

    console.log("GET PAYMENT ERROR:", error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// EXPORTS
// ==========================

module.exports = {

  createPayment,

  getPayments,

  getPaymentById,

  createRazorpayOrder,

  verifyRazorpayPayment,

};