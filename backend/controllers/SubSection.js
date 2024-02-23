const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId, timeDuraton } = req.body;
    const { video } = req.files.videoFile;

    if (!title || !description || !sectionId || !timeDuraton) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video to cdn

    const videoDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuraton,
      description: description,
      videoUrl: videoDetails.secure_url,
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
    // data input
    const { title, description, subSectionId } = req.body;
    // data validation

    if (!title || !description || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    // update data

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        sectionName,
        description,
      },
      { new: true }
    );

    // return res

    return res.status(200).json({
      success: true,
      message: "SubSection updation sucessfully",
      updateSection,
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
    const { subSectionId } = req.params;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // delete section
    // do we need to delete from Section schema??
    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "subSection deletion sucessfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "subSection deletion failed",
    });
  }
};
