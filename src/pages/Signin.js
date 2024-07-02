import React, { useState } from "react";
import signup from "../assets/Images/signup.webp";
import CTAbutton from "../components/core/HomePage/CTAbutton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import { setSignupData } from "../utils/authSlice";
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/operations/authApi";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = user;

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (user.pass != user.confirmPass) {
      toast.error("Password Do not Match");
      return;
    }

    const signupData = {
      ...user,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(user.email, navigate));
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    {
      id: 1,
      name: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      name: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];
  return (
    <div>
      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between">
        <div className="flex flex-row justify-between my-20  w-full">
          <div className="flex flex-col gap-4 max-w-[450px]">
            <h1 className="text-richblack-5 font-bold text-3xl">
              Join the millions learning to code with StudyNotion for free
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

            <div className="flex  mx-start bg-richblack-800 rounded-lg lg:w-[250px] border-b-richblack-500 border-b-[1px] rounded-l-full rounded-r-full max-md:w-[50%]">
              {tabData.map((element) => (
                <div
                  key={element?.id}
                  onClick={() => {
                    setAccountType(element.type);
                    setUser({
                      ...user,
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className={`flex m-1 w-full rounded-lg rounded-l-full rounded-r-full text-lg  p-2   ${
                    element?.type === accountType ? "bg-richblack-900" : ""
                  }`}
                >
                  <p className="mx-auto"> {element?.name}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleOnSubmit}
              className="flex flex-col  my-6 gap-3 "
            >
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col gap-2 relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    First Name <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    value={user?.firstName}
                    className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] text-richblack-200"
                    placeholder="First Name"
                    onChange={(e) => {
                      setUser({ ...user, firstName: e.target.value });
                    }}
                  />
                </div>
                <div className=" flex flex-col gap-2 relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Last Name <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    value={user?.lastName}
                    className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] text-richblack-200"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setUser({ ...user, lastName: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  value={user?.email}
                  className="bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] text-richblack-200"
                  placeholder="Enter Email Address"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
              <div className="flex gap-5 max-md:flex-col">
                <div className=" flex flex-col gap-2 relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={user?.password}
                    className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] text-richblack-200"
                    placeholder="Enter Password"
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </div>
                <div className=" flex flex-col gap-2 relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Confirm Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    value={user?.confirmPassword}
                    className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] text-richblack-200 "
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setUser({ ...user, confirmPassword: e.target.value });
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
              >
                Signin
              </button>
            </form>
          </div>
          <div className="max-md:hidden relative border-2 shadow-[12px_12px_0_0] shadow-richblack-5 w-11/12 max-w-[450px] max-h-[420px]">
            <img src={signup} className="h-full"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
