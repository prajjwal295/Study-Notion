const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const jwt = require("jsonwebtoken");


exports.updateProfile = async (req, res) => {
  try {
    // get data && userId
    const { gender, dob = "", contact, about = "" } = req.body;
    const userId = req.user.id;
    // validate data
    console.log({ userId });

    if (!gender || !dob || !contact || !about) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //find and update Profile

    const userDetails = await User.findById(userId);

    const ProfileId = userDetails.additionalDetails;

    const profileData = await Profile.findByIdAndUpdate(
      { _id: ProfileId },
      {
        gender: gender,
        dob: dob,
        contact: contact,
        about: about,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile Updation Sucessfully",
      profileData,
    });
    // return res
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Profile Updation failed",
    });
  }
};

// delete Account

// check schedule delete --> chrone job automatic task

exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const userId = req.user.id;

    // validate

    const userDetails = await User.findById({ _id: userId });
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // unroll the course
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: {
          courses: { $in: courses },
        },
      }
    );

    // profile delete
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    // delete user
    await User.findByIdAndDelete({ _id: userId });

    // return res
    return res.status(200).json({
      success: true,
      message: "User deletion Sucessfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "user deletion failed",
    });
  }
};

// issue in id fetching

exports.getAllUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    
    console.log({ userId });

    const userDetails = await User.findById(userId).populate(
      "additionalDetails"
    );

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Additional details fetched Sucessfully",
      userDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Additional details fetched failed",
    });
  }
};
