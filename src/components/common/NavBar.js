import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import CTAbutton from "../core/HomePage/CTAbutton";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { setToken } from "../../utils/authSlice";
import { setUser } from "../../utils/profileSlice";
import { logOut } from "../../services/operations/authApi";


const NavBar = () => {
  const token = useSelector((state) => state?.auth?.token);
  const { user } = useSelector((state) => state.profile);
  const { item } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getSubLinks();
  }, []);

  const getSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(categories.CATEGORIES_API);
      setSubLinks(result?.data?.allCategory);
    } catch (err) {
      console.log(err);
    }
  };




  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Nav Links */}

        <div className=" gap-6 hidden md:block">
          <div className="flex gap-x-6 text-richblack-25">
            <div
              className={`${
                matchRoute("/") ? "text-yellow-25" : "text-richblack-50"
              }`}
            >
              <Link to="/">Home</Link>
            </div>

            <div
              className={` text-richblack-50 flex gap-1 items-center relative group cursor-pointer`}
            >
              Catelog
              <IoIosArrowDown />
              <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[60%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] p-2 z-10">
                {subLinks?.length &&
                  subLinks?.map((list, index) => (
                    <Link to={`/${list?.name}`}>
                      <div key={index}>
                        <h1>{list?.name}</h1>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div
              className={`${
                matchRoute("/about") ? "text-yellow-25" : "text-richblack-50"
              }`}
            >
              <Link to="/about">About Us</Link>
            </div>
            <div
              className={`${
                matchRoute("/contact") ? "text-yellow-25" : "text-richblack-50"
              }`}
            >
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
