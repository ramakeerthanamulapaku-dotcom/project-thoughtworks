const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (req, res, next) => {

  try {

    let token;

    // CHECK TOKEN
    if (

      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")

    ) {

      token =
        req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // GET USER
      const user = await User.findById(
        decoded.id
      ).select("-password");

      if (!user) {

        return res.status(401).json({
          msg: "User not found",
        });

      }

      // ATTACH USER
      req.user = user;

      next();

    }

    else {

      return res.status(401).json({
        msg: "No Token",
      });

    }

  } catch (error) {

    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      msg: "Not Authorized",
    });

  }

};

module.exports = protect;