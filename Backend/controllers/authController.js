const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt.js");
const { OAuth2Client } = require("google-auth-library");
const sendEmail = require("../utils/sendEmail"); // (make sure you have this)

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ======================
// REGISTER
// ======================
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

// ======================
// LOGIN
// ======================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};

// ======================
// GOOGLE LOGIN
// ======================
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleLogin: true,
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(401).json({ message: "Google Login Failed" });
  }
};

// ======================
// SEND OTP
// ======================
const sendOTP = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  await User.findOneAndUpdate(
    { email },
    {
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    }
  );

  await sendEmail(email, otp);

  res.json({ msg: "OTP sent" });
};

// ======================
// VERIFY OTP
// ======================
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp != otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  res.json({ msg: "OTP verified" });
};

// ======================
// RESET PASSWORD
// ======================
const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    { password: hashed, otp: null }
  );

  res.json({ msg: "Password updated" });
};


const me=
  require("../models/User");

const getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.json(user);

    } catch (error) {

      res.status(500).json({

        message:
          "Server Error",

      });

    }

  };

// ======================
// EXPORTS
// ======================
module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  sendOTP,
  verifyOTP,
  resetPassword,
  getProfile
};