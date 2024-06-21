const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/auth");

const {
  deleteAccount,
  getAllUserDetails,
  updateProfile,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile");

router.delete("/deleteProfile",auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture",auth,  updateDisplayPicture);
router.get("/getEnrolledCourses",auth, getEnrolledCourses);
router.get("/getUserDetails", getAllUserDetails);

module.exports = router;
