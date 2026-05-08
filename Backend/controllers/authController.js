import User from "../models/User.js";

import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);


// ======================
// NORMAL SIGNUP
// ======================

export const registerUser = async (req, res) => {

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {

    res.status(400);
    throw new Error("User already exists");

  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

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
// NORMAL LOGIN
// ======================

export const loginUser = async (req, res) => {

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

    res.status(401);
    throw new Error("Invalid email or password");

  }

};


// ======================
// GOOGLE LOGIN + SIGNUP
// ======================

export const googleLogin = async (req, res) => {

  try {

    const { credential } = req.body;

    const ticket = await client.verifyIdToken({

      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,

    });

    const payload = ticket.getPayload();

    const { email, name } = payload;

    let user = await User.findOne({ email });

    // Create account automatically
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

    res.status(401);
    throw new Error("Google Login Failed");

  }

};