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

    if (!req.user) {

      return res.status(401).json({

        success: false,

        msg:
          "User not authorized",
      });
    }

    const {
      
      serviceId,
      
      serviceName,

      fullName,

      phone,

      address,

      city,

      pincode,

      landmark,

      bookingDate,

      bookingTime,

      notes,

      location,

    } = req.body;


    // VALIDATION

    if (

      !serviceId ||
      !serviceName ||

      !fullName ||

      !phone ||

      !address ||

      !bookingDate ||

      !bookingTime

    ) {

      return res.status(400).json({

        success: false,

        msg:
          "All required fields must be filled",
      });
    }


    // CREATE BOOKING

    const booking =
      new Booking({

        userId:
          req.user._id,

          serviceId,

        serviceName,

        fullName,

        phone,

        address,

        city,

        pincode,

        landmark,

        bookingDate,

        bookingTime,

        notes,

        location,

        status:
          "pending",

        workerId: null,
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
// GET ALL BOOKINGS
// ==========================

const getBookings =
async (req, res) => {

  try {

    const bookings =
      await Booking.find()

      .populate(
        "serviceId",
      )

      .populate(
        "workerId",
        "name email phone role"
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

      success: false,

      msg:
        error.message,
    });
  }
};


// ==========================
// GET USER BOOKINGS
// ==========================

const getUserBookings =
async (req, res) => {

  try {

    const bookings =
      await Booking.find({

        userId:
          req.params.userID,
      })

      .populate(
        "serviceId")

      .populate(
        "workerId",
        "name email phone role"
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

      success: false,

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
        "serviceId"
      )

      .populate(
        "workerId",
        "name email phone role"
      );


    if (!booking) {

      return res.status(404).json({

        success: false,

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

      success: false,

      msg:
        error.message,
    });
  }
};


// ==========================
// GET PENDING BOOKINGS
// ==========================

const getPendingBookings =
async (req, res) => {

  try {

    const bookings =
      await Booking.find({

        status: "pending",
      })

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

      success: false,

      msg:
        error.message,
    });
  }
};


// ==========================
// ACCEPT BOOKING
// ==========================

const acceptBooking =
async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404).json({

        success: false,

        msg:
          "Booking not found",
      });
    }

    booking.workerId =
      req.user._id;

    booking.status =
      "accepted";

    await booking.save();

const populatedBooking =
  await Booking.findById(
    booking._id
  )

  .populate(
    "userId",
    "name email role"
  )

  .populate(
    "workerId",
    "name email role"
  );

res.status(200).json({

  success: true,

  msg:
    "Booking accepted",

  booking:
    populatedBooking,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      msg:
        error.message,
    });
  }
};


// ==========================
// REJECT BOOKING
// ==========================

const rejectBooking =
async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404).json({

        success: false,

        msg:
          "Booking not found",
      });
    }

    booking.status =
      "rejected";

    await booking.save();


    res.status(200).json({

      success: true,

      msg:
        "Booking rejected",

      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

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

        success: false,

        msg:
          "Booking not found",
      });
    }

    booking.status =
      req.body.status ||
      booking.status;
    
      booking.paymentStatus =
  req.body.paymentStatus ||
  booking.paymentStatus;



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

      success: false,

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

        success: false,

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

      success: false,

      msg:
        error.message,
    });
  }
};

// ==========================
// GET WORKER BOOKINGS
// ==========================

const getWorkerBookings =
async (req, res) => {

  try {

    const bookings =
      await Booking.find({

        workerId:
          req.user._id,

      })

      .populate(
        "userId",
        "name email phone"
      )

      .populate(
        "serviceId"
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

      success: false,

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

  getUserBookings,

  getPendingBookings,

  acceptBooking,

  rejectBooking,

  deleteBooking,

  getWorkerBookings,
};