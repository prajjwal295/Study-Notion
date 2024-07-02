const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
  CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
  CATEGORIES_PAGEDETAILS_API: `${BASE_URL}/course/categoryPageDetails`,
};

export const endpoints = {
  SENDOTP_API: "http://localhost:4000/api/v1/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};

export const courseEndPoints = {
  CREATE_COURSE: BASE_URL + "/course/createCourse",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  UPDATE_COURSE_API: BASE_URL + "/course/updateCourse",
  GET_COURSEDETAILS_API: BASE_URL + "/course/getCourseDetails",
  CREATE_SECTION_API: BASE_URL + "/course/createSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
};

export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  // short cut
  COURSE_ENROLLMENT_API: BASE_URL + "/payment/EnrollStudent",
};
