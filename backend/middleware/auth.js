const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = (req, res, next) => {
  try {
    // extract token
    // 3 ways -->header safest
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorisation").replac("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }

    //   verify the token
    try {
      // paylod-->
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ decode });
      req.user = decode;

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "token verification authentication error",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType != "Student") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role can not be verified",
    });
  }
};

exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType != "Instructor") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for Instructor",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role can not be verified",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType != "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role can not be verified",
    });
  }
};


