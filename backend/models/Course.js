const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    reuqired: true,
  },

  courseDescription: {
    type: String,
    trim: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  whatYouWillLearn: {
    type: String,
    description: true,
  },

  price: {
    type: Number,
    required: true,
  },

  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratingAndReviews",
    },
  ],

  thumbnail: {
    type: String,
  },

  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  tag: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  instructions: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
