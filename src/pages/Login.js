import React, { useState } from "react";
import loginpic from "../assets/Images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authApi";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(login(user?.email, user?.password, navigate));

    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between">
        <div className="flex flex-row justify-between  w-full my-20 gap-24 ">
          <div className="flex flex-col gap-4 max-w-[450px]">
            <h1 className="text-richblack-5 font-bold text-4xl">
              Welcome Back
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">
                {" "}
                Build Build skills for today, tomorrow, and beyond.{" "}
              </span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                Education to future-proof your career.
              </span>
            </p>

            <form
              onSubmit={handleOnSubmit}
              className="flex flex-col  my-6 gap-5 "
            >
              <div className="flex flex-col gap-2">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  value={user.email}
                  className="bg-richblack-700 p-3 rounded-md cursor-text shadow-[0_1px_0_0] shadow-richblack-50"
                  placeholder="Enter Email Address"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
              <div className=" flex flex-col gap-2 relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  value={user.password}
                  className=" bg-richblack-700 p-3 rounded-md cursor-text shadow-[0_1px_0_0] shadow-richblack-50"
                  placeholder="Enter Password"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
                <Link
                  to="/forgot-password"
                  className="absolute bottom-0 translate-x-2 translate-y-6 right-5 text-xs text-blue-50"
                >
                  Forgot Password
                </Link>
              </div>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
              >
                Login
              </button>
            </form>
          </div>
          <div className="relative border-2 shadow-[12px_12px_0_0] shadow-richblack-5 w-11/12 max-w-[450px]">
            <img src={loginpic} className="h-full"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
