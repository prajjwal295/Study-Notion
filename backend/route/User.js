const express = require("express");

const router = express.Router();

const {
  login,
  signup,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

const {
  forgotPasswordToken,
  resetPassword,
} = require("../controllers/ChangePassword");

const { auth } = require("../middleware/auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOTP);

router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", forgotPasswordToken);

router.post("/reset-password", resetPassword);

module.exports = router;
