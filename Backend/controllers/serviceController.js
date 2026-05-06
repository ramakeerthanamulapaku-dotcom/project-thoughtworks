const Service = require("../models/Service");

// 🔹 Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).send(err);
  }
};

// 🔹 Get single service
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) return res.status(404).send("Service not found");

    res.json(service);
  } catch (err) {
    res.status(500).send(err);
  }
};

// 🔹 Create service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.send("Service created ✅");
  } catch (err) {
    res.status(500).send(err);
  }
};