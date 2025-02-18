import { apiConnector } from "../apiconnector";
import { RatingAndReviewEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { CREATE_RATINGS_API,
    GET_COURSERATINGBYID_API ,
    UPDATE_RATINGS_API
} = RatingAndReviewEndpoints;

export const createRatingAndReviews = async (data, token) => {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CREATE_RATINGS_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Review create API RESPONSE:", response);

        if (!response?.data?.success) {
            throw new Error("Could not add review");
        }

        toast.success("Review Added");
        return response?.data?.ratingReview
    } catch (err) {
        console.error("Review create API ERROR:", err);
        toast.error("Could not add review");
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};

export const getCourseReviewById = async (courseId, token) => {
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GET_COURSERATINGBYID_API, null, {
            Authorization: `Bearer ${token}`,
        },
            {courseId : courseId});

            console.log("Review Get API RESPONSE:", response);

            result = response?.data;
            if (!response?.data?.success) {
                throw new Error("Could not get review");
            }
    
            toast.success("Review Details");
            
    } catch (err) {
        console.error("Review create API ERROR:", err);
        toast.error("Could not Fetch review");
    }
    toast.dismiss(toastId)
    return result
}

export const updateCourseReview = async (data , token) =>{
    console.log(UPDATE_RATINGS_API)
    let result;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT" , UPDATE_RATINGS_API , data , {
            Authorization:`Bearer ${token}`,
        });
    
        console.log("Review create API RESPONSE:", response);

        if (!response?.data?.success) {
            throw new Error("Could not add review");
        }

        toast.success("Review Added");
        result = response?.data;
        
    }
    catch(err)
    {
        console.error("Review create API ERROR:", err);
        toast.error("Could not add review");
    }
    toast.dismiss(toastId)
    return result;
}