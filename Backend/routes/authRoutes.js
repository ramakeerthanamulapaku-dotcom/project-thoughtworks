const express = require("express");

const {
  registerUser,
  loginUser,
  googleLogin,
  sendOTP,
  verifyOTP,
  resetPassword,
} = require("../controllers/authController");

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  getProfile,
} = require(
  "../controllers/authController"
);

router.get(
  "/profile",
  protect,
  getProfile
);

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;