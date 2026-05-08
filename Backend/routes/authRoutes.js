import express from "express";

import {

  registerUser,
  loginUser,
  googleLogin,

} from "../controllers/authController.js";

const router = express.Router();


// Normal Signup
router.post("/signup", registerUser);


// Normal Login
router.post("/login", loginUser);


// Google Login
router.post("/google-login", googleLogin);


export default router;