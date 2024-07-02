import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { fetchCourseCategories } from "../services/operations/CourseApi";

const Cat = () => {
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSublinks = async () => {
    setLoading(true);
    const result = await fetchCourseCategories();
    console.log("Printing Sublinks result:", result);
    setSubLinks(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="flex flex-col my-auto justify-center items-center text-3xl text-white">
      <div className="mb-4 text-3xl font-semibold text-yellow-50">{`Available Courses :-`}</div>
      {loading ? (
        <div className="spinner"></div>
      ) : subLinks?.length > 0 ? (
        <>
          {subLinks
            ?.filter((subLink) => subLink?.course?.length > 0)
            .map((subLink, i) => (
              <Link
                to={`/catalog/${subLink.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className="rounded bg-transparent underline mb-2 py-4 px-4 hover:bg-richblack-700"
                key={i}
              >
                <p>{`${subLink.name} `}</p>
              </Link>
            ))}
        </>
      ) : (
        <p className="text-center">No Courses Found</p>
      )}
    </div>
  );
};

export default Cat;
