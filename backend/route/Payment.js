// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  enrollStudents,
} = require("../controllers/Payments");

const { auth, isStudent } = require("../middleware/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);
router.post("/EnrollStudent", auth, isStudent, enrollStudents);

module.exports = router;
