import react, { useEffect, useState } from "react";
import IconBtn from "../../common/IconBtn";
import { ImCross } from "react-icons/im";
import { CRating, useDebounce } from '@coreui/react-pro'
import { useDispatch, useSelector } from "react-redux";
import { createRatingAndReviews, getCourseReviewById, updateCourseReview } from "../../../services/operations/ratingAndReviewApi";
import { useParams } from "react-router-dom";

const CourseReviewModal = ({ setReviewModal }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [data, setData] = useState(null);

    const { token } = useSelector((store) => store.auth)

    const { courseId } = useParams();

    const [error, setError] = useState({
        rating: null,
        review: null
    })

    const isValidate = () => {
        let check = true;
        let errors = {}; 
    
        if (rating === 0 || rating === "" || rating == null) {
            errors.rating = "Ratings are required";
            check = false;
        }
    
        if (review === "" || review == null) {
            errors.review = "Review cannot be empty";
            check = false;
        }
    
        setError(errors); 
        return check;
    };
    

    useEffect(() => {
        fetchReview()
    }, [])

    const fetchReview = async () => {
        const response = await getCourseReviewById(courseId, token);
        setData(response?.response);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidate()) {
            var response = null;
            if (data) {
                const ratingId = data._id;
                response = await updateCourseReview({ rating, review, courseId, ratingId }, token);
            }
            else {
                response = await createRatingAndReviews({ rating, review, courseId }, token);
            }

            response && setReviewModal(false);
        }

    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[600px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <div className="flex flex-col items-center w-full gap-4">
                    {/* Heading */}
                    <div className="flex justify-between items-center w-full px-4">
                        <h1 className=" text-2xl font-medium text-richblack-5">Review Course</h1>
                        <button className="mr-4" onClick={() => {
                            setReviewModal(false)
                        }}>
                            <ImCross fontSize={16} fill="#AFB2BF" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:px-6">
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="Rating">
                                Course Ratings <sup className="text-pink-200">*</sup>
                            </label>
                            <input
                                type="text"
                                id="Rating"
                                placeholder="Enter Rating"
                                className="form-style resize-x-none  w-full"
                                onChange={(e) => {
                                    setRating(e.target.value);
                                }}
                                defaultValue={data && data?.rating}
                            />
                            {error.rating && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {error.rating}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="review">
                                Course Review <sup className="text-pink-200">*</sup>
                            </label>
                            <textarea
                                id="review"
                                placeholder="Enter Review"
                                className="form-style resize-x-none min-h-[130px] w-full"
                                onChange={(e) => {
                                    setReview(e.target.value);
                                }}
                                value={review}
                                defaultValue={data && data?.review}
                            />
                            {error.review && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {error.review}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Footer */}

                    <div>
                        <IconBtn text={data ? "Update" : "Submit"} onclick={handleSubmit}></IconBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseReviewModal;