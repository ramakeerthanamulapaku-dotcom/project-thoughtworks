const Booking =
require("../models/Booking");

const Payment =
require("../models/Payment");

const Maintenance =
require("../models/Maintenance");

// ==========================
// USER DASHBOARD
// ==========================

const getUserStats =
async (req, res) => {

  try {

    const userId =
      req.user._id;

    // TOTAL BOOKINGS
    const totalBookings =
      await Booking.countDocuments({
        userId,
      });

    // ACTIVE SERVICES
    const activeServices =
      await Booking.countDocuments({
        userId,
        status: "accepted",
      });

    // PENDING PAYMENTS
    const pendingPayments =
      await Payment.countDocuments({
        userId,
        status: "pending",
      });

    // MAINTENANCE REQUESTS
    const maintenanceRequests =
      await Maintenance.countDocuments({
        userId,
      });

    // ASSIGNED WORKERS
    const assignedWorkers =
      await Booking.countDocuments({
        userId,
        workerId: {
          $ne: null,
        },
      });

    // RECENT BOOKINGS
    const recentBookings =
      await Booking.find({
        userId,
      })

      .populate(
        "serviceId",
        "title price"
      )

      .populate(
        "workerId",
        "name email"
      )

      .sort({
        createdAt: -1,
      })

      .limit(5);

    res.status(200).json({

      success: true,

      stats: {

        totalBookings,

        activeServices,

        pendingPayments,

        maintenanceRequests,

        assignedWorkers,

      },

      recentBookings,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// WORKER DASHBOARD
// ==========================

const getWorkerStats =
async (req, res) => {

  try {

    const workerId =
      req.user._id;

    // ASSIGNED JOBS
    const assignedJobs =
      await Booking.countDocuments({
        workerId,
      });

    // ACTIVE JOBS
    const activeJobs =
      await Booking.countDocuments({
        workerId,
        status: "accepted",
      });

    // COMPLETED JOBS
    const completedJobs =
      await Booking.countDocuments({
        workerId,
        status: "completed",
      });

    // PENDING JOBS
    const pendingJobs =
      await Booking.countDocuments({
        workerId,
        status: "pending",
      });

    // GET BOOKINGS
    const workerBookings =
      await Booking.find({
        workerId,
      });

    const bookingIds =
      workerBookings.map(
        (booking) =>
          booking._id
      );

    // GET PAYMENTS
    const payments =
      await Payment.find({

        bookingId: {
          $in: bookingIds,
        },

        status: "paid",

      });

    // TOTAL EARNINGS
     const paidBookings =
  await Booking.find({

    workerId:
      req.user._id,

    paymentStatus:
      "paid",
  })

  .populate(
    "serviceId",
    "price title"
  );

const totalEarnings =
  paidBookings.reduce(

    (total, booking) =>

      total +

      (
        booking?.serviceId?.price ||

        0
      ),

    0
  );

    // RECENT JOBS
    const recentJobs =
      await Booking.find({
        workerId,
      })

      .populate(
        "serviceId",
        "title price"
      )

      .populate(
        "userId",
        "name email"
      )

      .sort({
        createdAt: -1,
      })

      .limit(5);

    res.status(200).json({

      success: true,

      stats: {

        assignedJobs,

        activeJobs,

        completedJobs,

        pendingJobs,

        totalEarnings,

      },

      recentJobs,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  getUserStats,

  getWorkerStats,

};