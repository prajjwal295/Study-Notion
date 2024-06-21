const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const jwt = require("jsonwebtoken");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    // get data && userId
    const {
      gender = "",
      dob = "",
      contact = "",
      about = "",
      firstName = "",
      lastName = "",
    } = req.body;
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

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
      },
      {
        new: true,
      }
    );

    await userData.save();

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
      userData,
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

// check schedule delete --> chrone job automatic task

exports.updateDisplayPicture = async (req, res) => {
  console.log(req.files);
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME
    );

    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Profile Updation Failed",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  // console.log(req);
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

    // profile delete
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    // unroll the course
    for (const courseId of userDetails.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentEnrolled: userId } },
        { new: true }
      );
    }
    console.log(2);

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

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    console.log(userDetails)
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error in Instrutor Dashboard" });
  }
};
