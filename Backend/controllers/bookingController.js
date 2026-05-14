const Booking =
require("../models/Booking");

// ==========================
// CREATE BOOKING
// ==========================

const createBooking =
async (req, res) => {

  try {

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "USER:",
      req.user
    );

    // CHECK USER
    if (!req.user) {

      return res.status(401).json({
        msg:
          "User not authorized",
      });

    }

    const {
      serviceId,
      fullName,
      phone,
      address,
      date,
      time,
    } = req.body;

    // VALIDATION
    if (
      !serviceId ||
      !date ||
      !time
    ) {

      return res.status(400).json({
        msg:
          "All fields are required",
      });

    }

    // CREATE BOOKING
    const booking =
      new Booking({

        userId:
          req.user._id,

        serviceId,

        fullName,

        phone,

        address,

        date,

        time,

        status:
          "pending",

      });

    const savedBooking =
      await booking.save();

    res.status(201).json({

      success: true,

      msg:
        "Booking created successfully",

      booking:
        savedBooking,

    });

  } catch (error) {

    console.log(
      "BOOKING ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      msg:
        error.message,

    });

  }

};

// ==========================
// GET USER BOOKINGS
// ==========================

const getBookings =
async (req, res) => {

  try {

    if (!req.user) {

      return res.status(401).json({
        msg:
          "Unauthorized",
      });

    }

    const bookings =
      await Booking.find({

        userId:
          req.user._id,

      })

      .populate(
        "serviceId",
        "name description price"
      )

      .populate(
        "workerId",
        "name email phone role profilePic"
      )

      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      bookings,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      msg:
        error.message,

    });

  }

};

// ==========================
// GET SINGLE BOOKING
// ==========================

const getBookingById =
async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      )

      .populate(
        "serviceId",
        "name description price"
      )

      .populate(
        "workerId",
        "name email phone role profilePic"
      );

    if (!booking) {

      return res.status(404).json({
        msg:
          "Booking not found",
      });

    }

    res.status(200).json({

      success: true,

      booking,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      msg:
        error.message,

    });

  }

};

// ==========================
// UPDATE BOOKING STATUS
// ==========================

const updateBookingStatus =
async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404).json({
        msg:
          "Booking not found",
      });

    }

    booking.status =
      req.body.status ||
      booking.status;

    await booking.save();

    res.status(200).json({

      success: true,

      msg:
        "Booking updated successfully",

      booking,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      msg:
        error.message,

    });

  }

};

// ==========================
// DELETE BOOKING
// ==========================

const deleteBooking =
async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404).json({
        msg:
          "Booking not found",
      });

    }

    await booking.deleteOne();

    res.status(200).json({

      success: true,

      msg:
        "Booking deleted successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      msg:
        error.message,

    });

  }

};

module.exports = {

  createBooking,

  getBookings,

  getBookingById,

  updateBookingStatus,

  deleteBooking,

};