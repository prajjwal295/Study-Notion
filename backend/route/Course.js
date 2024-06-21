const express = require("express");
const { auth, isInstructor ,isAdmin} = require("../middleware/auth");

const router = express.Router();

const {
  showAllCourses,
  createCourse,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse
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


router.post("/createCourse",auth,isInstructor, createCourse);
router.put("/updateCourse", editCourse);
router.get("/showAllCourses", showAllCourses);
router.get("/getCourseDetails", getCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

router.post("/createCategory",auth,isAdmin, createCategory);
router.get("/showAllCategories", showAllCategorys);
router.get("/categoryPageDetails", categoryPageDetails);

router.post("/createSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

router.post("/createSubSection",auth,isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

module.exports = router;
