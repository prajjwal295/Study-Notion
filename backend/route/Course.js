const express = require("express");

const router = express.Router();

const {
  showAllCourses,
  createCourse,
  getCourseDetails,
} = require("../controllers/Course");

const {
  createCategory,
  showAllCategorys,
  categoryPageDetails,
} = require("../controllers/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

router.post("/createCourse", createCourse);
router.get("/showAllCourses", showAllCourses);
router.get("/getCourseDetails", getCourseDetails);

router.post("/createCategory", createCategory);
router.get("/showAllCategories", showAllCategorys);
router.get("/categoryPageDetails", categoryPageDetails);

router.post("/createSection", createSection);
router.put("/updateSection", updateSection);
router.delete("/deleteSection", deleteSection);

router.post("/createSubSection", createSubSection);
router.put("/updateSubSection", updateSubSection);
router.delete("/deleteSubSection", deleteSubSection);

module.exports = router;
