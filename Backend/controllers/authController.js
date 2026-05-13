const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt.js");
const { OAuth2Client } = require("google-auth-library");
const sendEmail = require("../utils/sendEmail");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ======================
// REGISTER
// ======================
const registerUser = async (req, res) => {
  const { name, email, password , role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

// ======================
// LOGIN
// ======================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
  return res.status(404).json({
    message: "User not found. Please signup first",
  });
}

  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
    const { credential , role} = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name , picture} = payload;

    let user = await User.findOne({ email });

    if (user && !user.profilePic) {
  user.profilePic = picture;
  await user.save();
}

    if (!user) {
      user = await User.create({
        name,
        email,
        profilePic: picture,
        googleLogin: true,
        role: role || "user", // Default role for Google users
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(401).json({ message: "Google Login Failed" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || "";
    user.address = address || "";

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      address: updatedUser.address,
      profilePic: updatedUser.profilePic,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
    });
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
  getProfile,
  updateProfile,
};