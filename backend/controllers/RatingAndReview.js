const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const User = require(".../models/User");
const { default: mongoose } = require("mongoose");

// create  rating
exports.createRatingAndReviews = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;

    if (!userId || (!rating && !review)) {
      return res.json({
        success: false,
        Message: "All fields are required",
      });
    }

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.json({
        success: false,
        Message: "Student is not enrolled in course",
      });
    }

    // check if user already reviewed or not

    const alreadyReviewd = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewd) {
      return res.json({
        success: false,
        Message: "You can not review multiple time",
      });
    }

    // create review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // update in course
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { ratingAndReviews: ratingReview._id },
      },
      { new: true }
    );

    return res(200).json({
      success: true,
      Message: "Review adding successfully",
      ratingReview,
    });
  } catch (err) {
    return res.json({
      success: false,
      Message: "Review adding false",
    });
  }
};

// get avg rating

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    // calculate avg rating

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      Message: "There is no ratings on this Course",
      averageRating: 0,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      Message: "Average review failed",
    });
  }
};

// get all rating

exports.getAllRatingAndReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return res.status(200).json({
      success: true,
      Message: "All Reviews fetched Successfully",
      allReviews,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      Message: "All Reviews fetched failed",
    });
  }
};
