const Payment = require("../models/Payment");
const Booking = require("../models/Booking");


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

 

};