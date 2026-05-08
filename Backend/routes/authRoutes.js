const express = require("express");

const {
  registerUser,
  loginUser,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

// Normal Signup
router.post("/signup", registerUser);

// Normal Login
router.post("/login", loginUser);

// Google Login
router.post("/google-login", googleLogin);

module.exports = router;