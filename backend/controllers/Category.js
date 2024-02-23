const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create entry in db

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log({ categoryDetails });

    return res.status(200).json({
      success: true,
      message: "Category created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong in Category creation",
    });
  }
};

exports.showAllCategorys = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All Category returned successfully",
      allCategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong in showing Category",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    // get category id;
    const { categoryId } = req.body;

    // get all course by category id

    // get top selling courses

    const selectedCategory = await Category.findById({
      _id: categoryId,
    })
      .populate("course")
      .exec();

    // validation

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    // get courses from diff category
    // { $ne: categoryId } not equal to

    const differentCategories = await Category.findById({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    // get top selling courses

    const topSellingCourse = await Course.aggregate([
      {
        $project: {
          courseName: 1,
          studentEnrolledCount: { $size: "$studentEnrolled" },
        },
      },
      {
        $sort: { studentEnrolledCount: -1 },
      },
      {
        $limit: 10, // You can adjust the limit based on your requirements
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Data found ",
      categoryPageDetails,
      differentCategories,
      topSellingCourse,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Data not found",
    });
  }
};
