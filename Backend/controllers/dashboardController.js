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

    // ASSIGNED

    const assignedJobs =
      await Booking.countDocuments({

        workerId,

        status: {
          $in: [
            "accepted",
            "working",
            "completed",
          ],
        },
      });

    // COMPLETED

    const completedJobs =
      await Booking.countDocuments({

        workerId,

        status:
          "completed",
      });

    // PENDING

    const pendingJobs =
      await Booking.countDocuments({

        workerId,

        status: {
          $in: [
            "accepted",
            "working",
          ],
        },
      });

    // EARNINGS

    const completedBookings =
      await Booking.find({

        workerId,

        status:
          "completed",
      });

    let totalEarnings = 0;

    completedBookings.forEach(
      (booking) => {

        totalEarnings +=
          booking.price || 0;
      }
    );

    // RECENT JOBS

    const recentJobs =
      await Booking.find({

        workerId,
      })

      .sort({
        createdAt: -1,
      })

      .limit(5);

    // RESPONSE

    res.json({

      assignedJobs,

      completedJobs,

      pendingJobs,

      totalEarnings,

      recentJobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};



module.exports = {

  getUserStats,

  getWorkerStats,

};