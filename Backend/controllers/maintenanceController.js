const Maintenance = require("../models/Maintenance");

// CREATE REQUEST
const createMaintenance = async (req, res) => {
  try {
    console.log("MAINTENANCE HIT");
    console.log(req.body);

    const maintenance = new Maintenance(req.body);

    const saved = await maintenance.save();

    res.status(201).json({
      message: "Maintenance request created",
      data: saved,
    });

  } catch (error) {
    console.log("MAINTENANCE ERROR:", error);

    res.status(500).json({
      message: "Failed to create maintenance",
      error: error.message,
    });
  }
};

// GET ALL REQUESTS
const getMaintenance = async (req, res) => {
  try {
    const data = await Maintenance.find();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch maintenance",
      error: error.message,
    });
  }
};

// UPDATE STATUS
const updateMaintenanceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Maintenance.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

module.exports = {
  createMaintenance,
  getMaintenance,
  updateMaintenanceStatus,
};