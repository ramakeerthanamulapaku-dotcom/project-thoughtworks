const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
  sendOTP,
  verifyOTP,
  resetPassword,
  getProfile,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

/* =========================
   AUTH ROUTES
========================= */

// REGISTER
router.post("/register",registerUser);

// LOGIN
router.post("/login",loginUser);

// GOOGLE LOGIN
router.post("/google",googleLogin);

// SEND OTP
router.post("/send-otp",sendOTP);

// VERIFY OTP
router.post("/verify-otp",verifyOTP);

// RESET PASSWORD
router.post("/reset-password",resetPassword);

// PROFILE
router.get("/profile",protect,getProfile);

module.exports = router;