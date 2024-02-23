const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const jwt = require("jsonwebtoken");

// create course

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, price, whatYouWillLearn, category } =
      req.body;
    const { thumbnail } = req.files;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !price ||
      !whatYouWillLearn ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const instructorDetails = await User.findById(userId);

    console.log("Instructor details :", instructorDetails);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not found ",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "category details not found ",
      });
    }

    console.log({ thumbnail });

    // upload image to cdn

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create an entry fornew code

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add the new cousre to instructor user

    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    // update category schema
    await Category.findByIdAndUpdate(
      {
        _id: categoryDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Course created Successfully",
      data: newCourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Course created failed",
    });
  }
};

// get all courses

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
        thumbnail: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Courses returned successfully",
      allCourses,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Course getting failed",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `could not find the course with ${coureId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Found the course with ${coureId}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Courses with all details fetched failed",
    });
  }
};
