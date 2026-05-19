const Service = require("../models/Service");

// GET ALL SERVICES
const getServices = async (
  req,
  res
) => {
  try {

    const services =
      await Service.find();

    res.status(200).json(
      services
    );

  } catch (error) {

    console.log(
      "GET SERVICES ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch services",
      error: error.message,
    });

  }
};

// GET SINGLE SERVICE
const getServiceById =
  async (req, res) => {

    try {const Service = require("../models/Service");

// GET ALL SERVICES
const getServices = async (
  req,
  res
) => {
  try {

    const services =
      await Service.find();

    res.status(200).json(
      services
    );

  } catch (error) {

    console.log(
      "GET SERVICES ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch services",
      error: error.message,
    });

  }
};

// GET SINGLE SERVICE
const getServiceById =
  async (req, res) => {

    try {

      const service =
        await Service.findById(
          req.params.id
        );

      if (!service) {

        return res
          .status(404)
          .json({
            message:
              "Service not found",
          });

      }

      res.status(200).json(
        service
      );

    } catch (error) {

      console.log(
        "GET SERVICE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch service",
      });

    }
  };

// CREATE SERVICE
const createService =
  async (req, res) => {

    try {

      const {
        title,
        price,
        description,
        image,
        category,
      } = req.body;

      const service =
        await Service.create({

          title,

          price,

          description,

          image,

          category,

        });

      res.status(201).json({

        success: true,

        message:
          "Service created",

        service,

      });

    } catch (error) {

      console.log(
        "CREATE SERVICE ERROR:",
        error
      );
     res.status(500).json({

  success: false,

  message:
    error.message,

  stack:
    error.stack,
});

      

    }
  };

// UPDATE SERVICE
const updateService =
  async (req, res) => {

    try {

      const updated =
        await Service.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      res.status(200).json(
        updated
      );

    } catch (error) {

      console.log(
        "UPDATE SERVICE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Update failed",
      });

    }
  };

// DELETE SERVICE
const deleteService =
  async (req, res) => {

    try {

      await Service.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Service deleted",
      });

    } catch (error) {

      console.log(
        "DELETE SERVICE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Delete failed",
      });

    }
  };

// SEARCH SERVICES
const searchServices =
  async (req, res) => {

    try {

      const keyword =
        req.query.search
          ? {
              title: {
                $regex:
                  req.query.search,
                $options: "i",
              },
            }
          : {};

      const services =
        await Service.find(
          keyword
        );

      res.status(200).json(
        services
      );

    } catch (error) {

      console.log(
        "SEARCH ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Search failed",
      });

    }
  };

module.exports = {

  getServices,

  getServiceById,

  createService,

  updateService,

  deleteService,

  searchServices,

};

      const service =
        await Service.findById(
          req.params.id
        );

      if (!service) {

        return res
          .status(404)
          .json({
            message:
              "Service not found",
          });

      }

      res.status(200).json(
        service
      );

    } catch (error) {

      console.log(
        "GET SERVICE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch service",
      });

    }
  };

// CREATE SERVICE
const createService =
  async (req, res) => {

    try {

      const {
        title,
        price,
        description,
        image,
        category,
      } = req.body;

      const service =
        await Service.create({

          title,

          price,

          description,

          image,

          category,

        });

      res.status(201).json({

        success: true,

        message:
          "Service created",

        service,

      });

    } catch (error) {

      console.log(
        "CREATE SERVICE ERROR:",
        error
      );
     res.status(500).json({

  success: false,

  message:
    error.message,

  stack:
    error.stack,
});

      

    }
  };

// UPDATE SERVICE
const updateService =
  async (req, res) => {

    try {

      const updated =
        await Service.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      res.status(200).json(
        updated
      );

    } catch (error) {

      console.log(
        "UPDATE SERVICE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Update failed",
      });

    }
  };

// DELETE SERVICE
const deleteService =
  async (req, res) => {

    try {

      await Service.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Service deleted",
      });

    } catch (error) {

      console.log(
        "DELETE SERVICE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Delete failed",
      });

    }
  };

// SEARCH SERVICES
const searchServices =
  async (req, res) => {

    try {

      const keyword =
        req.query.search
          ? {
              title: {
                $regex:
                  req.query.search,
                $options: "i",
              },
            }
          : {};

      const services =
        await Service.find(
          keyword
        );

      res.status(200).json(
        services
      );

    } catch (error) {

      console.log(
        "SEARCH ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Search failed",
      });

    }
  };

module.exports = {

  getServices,

  getServiceById,

  createService,

  updateService,

  deleteService,

  searchServices,

};