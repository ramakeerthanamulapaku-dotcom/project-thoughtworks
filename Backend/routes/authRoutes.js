const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login working");
});

router.post("/register", (req, res) => {
  res.send("Register working");
});

module.exports = router; // ✅ VERY IMPORTANT