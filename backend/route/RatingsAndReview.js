const express = require("express");
const router = express.Router();
const {getRatingAndReviewById , createRatingAndReviews,updateRatingAndReview} = require("../controllers/RatingAndReview");
const { isStudent, auth } = require("../middleware/auth");

router.get("/getCourseRatingById" ,auth , getRatingAndReviewById)
router.post("/createRating", auth , isStudent , createRatingAndReviews)
router.put("/updateRating" , auth ,isStudent , updateRatingAndReview )

module.exports = router;