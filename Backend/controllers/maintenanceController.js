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
        msg:
          "Please fill all required fields",
      });

    }

    // CREATE REQUEST
    const maintenance =
      await Maintenance.create({

        userId:
          req.user.id,

        title,

        description,

        location,

        priority:
          priority || "medium",

        status:
          "pending",

      });

    res.status(201).json({

      msg:
        "Maintenance request created",

      maintenance,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: error.message,
    });

  }

};

// ==========================
// GET USER MAINTENANCE
// ==========================

const getMaintenance =
async (req, res) => {

  try {

    const data =
      await Maintenance.find({

        userId:
          req.user.id,

      })

      .populate(
        "workerId",
        "name email"
      )

      .sort({
        createdAt: -1,
      });

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      msg: error.message,
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
      )

      .populate(
        "workerId",
        "name email"
      );

    if (!maintenance) {

      return res.status(404).json({
        msg:
          "Maintenance request not found",
      });

    }

    res.json(maintenance);

  } catch (error) {

    res.status(500).json({
      msg: error.message,
    });

  }

};

// ==========================
// UPDATE STATUS
// ==========================

const updateMaintenanceStatus =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const maintenance =
      await Maintenance.findById(id);

    if (!maintenance) {

      return res.status(404).json({
        msg:
          "Maintenance request not found",
      });

    }

    maintenance.status =
      req.body.status ||
      maintenance.status;

    await maintenance.save();

    res.json({

      msg:
        "Status updated successfully",

      maintenance,

    });

  } catch (error) {

    res.status(500).json({
      msg: error.message,
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
        msg:
          "Maintenance request not found",
      });

    }

    await maintenance.deleteOne();

    res.json({
      msg:
        "Maintenance request deleted",
    });

  } catch (error) {

    res.status(500).json({
      msg: error.message,
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