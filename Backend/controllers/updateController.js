const Update = require("../models/Update");

exports.addUpdate = async (req, res) => {
  const update = new Update(req.body);
  await update.save();
  res.send("Update added");
};

exports.getUpdates = async (req, res) => {
  const updates = await Update.find({ bookingId: req.params.bookingId });
  res.json(updates);
};