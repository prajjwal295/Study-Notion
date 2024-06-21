const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { updateCourse } = require("../../src/services/operations/CourseApi");
// const jwt = require("jsonwebtoken");

// create course

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      price,
      whatYouWillLearn,
      category,
      tag,
      status,
    } = req.body;
    const { thumbnail } = req.files;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !price ||
      !whatYouWillLearn ||
      !category ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    const userId = req.user.id;

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
      tag: tag,
      status: status,
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
      { status: "Published" },
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
        message: `could not find the course with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Found the course with ${courseId}`,
      courseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Courses with all details fetched failed",
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const instructorId = req.user.id;

    const courseDetails = await Course.findById(courseId);

    const studentEnrolled = courseDetails.studentEnrolled;

    await User.findByIdAndUpdate(
      { instructorId },
      {
        $pull: {
          courses: courseId,
        },
      },
      { new: true }
    );

    for (const key in studentEnrolled) {
      await User.findByIdAndUpdate(
        { userId: key },
        {
          $pull: {
            courses: courseId,
          },
        },
        { new: true }
      );
    }

    const updatedCourse = await Course.findByIdAndDelete(
      { courseId },
      { new: true }
    )
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
      updatedCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Course",
      error: err.message,
    });
  }
};
