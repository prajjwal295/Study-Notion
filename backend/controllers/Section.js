const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate("courseContent")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Section creation failed",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // data input
    const { sectionName, sectionId, courseId } = req.body;
    // data validation

    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    // update data

    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return res

    return res.status(200).json({
      success: true,
      message: "Section updation sucessfully",
      updatedCourse,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Section updation failed",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    // get section id
    // assuming  sending id in params
    const { sectionId, courseId } = req.body;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: sectionId,
        },
      },
      { new: true }
    )
      .populate("courseContent")
      .exec();

    // delete section
    // do we need to delete from course schema??
    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deletion sucessfully",
      updatedCourseDetails,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Section deletion failed",
    });
  }
};
