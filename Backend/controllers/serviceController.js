const Service = require("../models/Service");

// 🔹 Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).send(err);
  }
};

// 🔹 Get single service
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) return res.status(404).send("Service not found");

    res.json(service);
  } catch (err) {
    res.status(500).send(err);
  }
};

// 🔹 Create service
const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.send("Service created ✅");
  } catch (err) {
    res.status(500).send(err);
  }
};

// 🔹 Update service
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service)
      return res.status(404).send("Service not found");

    res.json(service);

  } catch (err) {
    res.status(500).send(err);
  }
};

// 🔹 Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndRemove(req.params.id);

    if (!service)
      return res.status(404).send("Service not found");

    res.json(service);

  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};