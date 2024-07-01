import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";
import { courseEndPoints } from "../apis";
const { CATEGORIES_API, CATEGORIES_PAGEDETAILS_API } = categories;
const {
  CREATE_COURSE,
  UPDATE_COURSE_API,
  DELETE_COURSE_API,
  GET_COURSEDETAILS_API,
  CREATE_SECTION_API,
  DELETE_SECTION_API,
  UPDATE_SECTION_API,
  CREATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
} = courseEndPoints;

export const fetchCourseCategories = async () => {
  const toastId = toast.loading("loading...");
  var result = [];
  try {
    const response = await apiConnector("GET", CATEGORIES_API, null, {});

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.allCategory;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCategoryDetails = async (data) => {
  const toastId = toast.loading("loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "GET",
      CATEGORIES_PAGEDETAILS_API,
      null,
      {},
      {
        categoryId: data,
      }
    );

    // console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
};

export const createCourse = async (formData, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_COURSE, formData, {
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE API ERROR............", error);
    toast.error("Could not create Courses");
  }
  toast.dismiss(toastId);
  return result;
};

export const updateCourse = async (formData, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiConnector("PUT", UPDATE_COURSE_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE API ERROR............", error);
    toast.error("Could not create Courses");
  }
  toast.dismiss(toastId);
  return result;
};

export const getFullDetailsOfCourse = async (data, token) => {
  console.log(data);
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_COURSEDETAILS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        courseId: data,
      }
    );

    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.courseDetails;
  } catch (error) {
    console.log("GET_COURSE API ERROR............", error);
    toast.error("Could not GET Courses Details");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, courseId, {
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    toast.error("Could not DELETE Courses");
  }
  toast.dismiss(toastId);
};

export const createSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.updatedCourseDetails;
  } catch (error) {
    console.log("CREATE_COURSE_SECTION API ERROR............", error);
    toast.error("Could not create Course section");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    result = response?.data?.updatedCourseDetails;

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("Delete Section API ERROR............", error);
    toast.error("Could not Delete Course Section");
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    result = response?.data?.updatedCourse;

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("updating Section API ERROR............", error);
    toast.error("Could not update Course Section");
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    result = response?.data?.sectionUpdate;
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("update SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not update Lecture");
    }
    toast.success("Lecture Updated");
    result = response?.data?.updatedSection;
  } catch (error) {
    console.log("update SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("delete SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.updatedSection;
  } catch (error) {
    console.log("delete SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("INSTRUCTOR COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
