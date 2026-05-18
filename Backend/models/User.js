const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  profilePic:{ type: String},
  phone: {
  type: String,
  default: "",
},
role:{
  type: String,
  enum:["user", "worker", "admin"],
  default:"user",
},

address: {
  type: String,
  default: "",
},
  password: String,
  googleLogin: Boolean,
  otp: String,
  otpExpiry: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;