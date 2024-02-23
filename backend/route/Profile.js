const express = require("express");

const router = express.Router();


const { auth } = require("../middleware/auth");

const {
  deleteAccount,
  getAllUserDetails,
  updateProfile,

  //   getEnrooledCOurses and update display pis
} = require("../controllers/Profile");

router.delete("/deleteProfile", deleteAccount);
router.put("/updateProfile",auth,  updateProfile);
router.get("/getUserDetails", getAllUserDetails);

module.exports = router;
