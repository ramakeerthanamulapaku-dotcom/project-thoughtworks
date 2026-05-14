const Update =
require("../models/Update");

const Booking =
require("../models/Booking");

// ==========================
// ADD UPDATE
// ==========================

const addUpdate =
async (req, res) => {

  try {

    const {

      bookingId,

      message,

      status,

      location,

    } = req.body;

    // VALIDATION
    if (
      !bookingId ||
      !message
    ) {

      return res.status(400).json({

        msg:
          "Booking ID and message are required",

      });

    }

    // CHECK BOOKING
    const booking =
      await Booking.findById(
        bookingId
      );

    if (!booking) {

      return res.status(404).json({

        msg:
          "Booking not found",

      });

    }

    // SECURITY CHECK
    if (
      booking.userId.toString() !==
      req.user.id &&

      booking.workerId?.toString() !==
      req.user.id
    ) {

      return res.status(401).json({

        msg:
          "Unauthorized access",

      });

    }

    // CREATE UPDATE
    const update =
      await Update.create({

        bookingId,

        userId:
          req.user.id,

        message,

        status:
          status || "in-progress",

        location:
          location || "",

      });

    res.status(201).json({

      msg:
        "Update added successfully",

      update,

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
// GET BOOKING UPDATES
// ==========================

const getUpdates =
async (req, res) => {

  try {

    const {
      bookingId,
    } = req.params;

    // CHECK BOOKING
    const booking =
      await Booking.findById(
        bookingId
      );

    if (!booking) {

      return res.status(404).json({

        msg:
          "Booking not found",

      });

    }

    // SECURITY
    if (
      booking.userId.toString() !==
      req.user.id &&

      booking.workerId?.toString() !==
      req.user.id
    ) {

      return res.status(401).json({

        msg:
          "Unauthorized access",

      });

    }

    // FETCH UPDATES
    const updates =
      await Update.find({

        bookingId,

      })

      .populate(
        "userId",
        "name email"
      )

      .sort({
        createdAt: -1,
      });

    res.json(updates);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      msg:
        error.message,

    });

  }

};

// ==========================
// DELETE UPDATE
// ==========================

const deleteUpdate =
async (req, res) => {

  try {

    const update =
      await Update.findById(
        req.params.id
      );

    if (!update) {

      return res.status(404).json({

        msg:
          "Update not found",

      });

    }

    // SECURITY
    if (
      update.userId.toString() !==
      req.user.id
    ) {

      return res.status(401).json({

        msg:
          "Unauthorized",

      });

    }

    await update.deleteOne();

    res.json({

      msg:
        "Update deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      msg:
        error.message,

    });

  }

};

module.exports = {

  addUpdate,

  getUpdates,

  deleteUpdate,

};