const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId } = req.body;
    const { video } = req.files;

    if (!title || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // const videoDetails = await uploadToCloudinary(
    //   req.files.video,
    //   process.env.FOLDER_NAME,
    // );
    const videoDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    const subSectionDetails = await SubSection.create({
      title: title,
      description: description,
      videoUrl: videoDetails.secure_url,
      timeDuration: videoDetails.duration,
    });

    const sectionUpdate = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection creation Successfully",
      sectionUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "SubSection creation failed",
    });
  }
};

// todo
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection updation sucessfully",
      updatedSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "SubSection updation failed",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();

    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "subSection deletion sucessfully",
      updatedSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "subSection deletion failed",
    });
  }
};
