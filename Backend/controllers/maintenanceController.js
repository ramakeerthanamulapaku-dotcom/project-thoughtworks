const Maintenance =
require("../models/Maintenance");


// ==========================
// CREATE MAINTENANCE REQUEST
// ==========================

const createMaintenance =
async (req, res) => {

  try {

    const {
      title,
      description,
      location,
      priority,
    } = req.body;

    // VALIDATION

    if (
      !title ||
      !description ||
      !location
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all fields",

      });
    }

    // CREATE REQUEST

    const maintenance =
      await Maintenance.create({

        userId:
          req.user._id,

        title,

        description,

        location,

        priority:
          priority || "medium",

        status:
          "pending",

      });

    res.status(201).json({

      success: true,

      message:
        "Complaint submitted successfully",

      maintenance,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });
  }
};



// ==========================
// GET USER REQUESTS
// ==========================

const getMaintenance =
async (req, res) => {

  try {

    const requests =
      await Maintenance.find({

        userId:
          req.user._id,

      })

      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      requests,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });
  }
};



// ==========================
// UPDATE STATUS
// ==========================

const updateMaintenanceStatus =
async (req, res) => {

  try {

    const maintenance =
      await Maintenance.findById(
        req.params.id
      );

    if (!maintenance) {

      return res.status(404).json({

        success: false,

        message:
          "Request not found",

      });
    }

    maintenance.status =
      req.body.status ||
      maintenance.status;

    await maintenance.save();

    res.status(200).json({

      success: true,

      message:
        "Status updated",

      maintenance,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });
  }
};


// ==========================
// GET SINGLE REQUEST
// ==========================

const getMaintenanceById =
async (req, res) => {

  try {

    const maintenance =
      await Maintenance.findById(
        req.params.id
      );

    if (!maintenance) {

      return res.status(404).json({

        success: false,

        message:
          "Request not found",

      });
    }

    res.status(200).json({

      success: true,

      maintenance,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });
  }
};






// ==========================
// DELETE REQUEST
// ==========================

const deleteMaintenance =
async (req, res) => {

  try {

    const maintenance =
      await Maintenance.findById(
        req.params.id
      );

    if (!maintenance) {

      return res.status(404).json({

        success: false,

        message:
          "Request not found",

      });
    }

    await maintenance.deleteOne();

    res.status(200).json({

      success: true,

      message:
        "Request deleted",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });
  }
};


module.exports = {

  createMaintenance,

  getMaintenance,

  getMaintenanceById,

  updateMaintenanceStatus,

  deleteMaintenance,

};