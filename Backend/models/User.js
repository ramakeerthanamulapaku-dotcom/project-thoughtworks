import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {

    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },

    googleLogin: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;