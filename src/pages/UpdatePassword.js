import React, { useState } from "react";
import { Link, NavLink, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../services/operations/authApi";

import { useDispatch } from "react-redux";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    pass: "",
    confirmPass: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password?.pass, password?.confirmPass, token,navigate));
  };

  return (
    <div className="grid place-items-center pt-20">
      <div className="max-w-[500px] p-4 lg:p-8 flex flex-col gap-5">
        <h1 className="font-bold text-richblack-5 text-3xl">
          Choose New Password
        </h1>

        <p className="w-full text-richblack-5 text-sm">
          Allmost done.Enter your new password and you all set.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "password" : "text"}
              value={password?.pass}
              className="bg-richblack-700 p-3 rounded-md cursor-text shadow-[0_1px_0_0] text-richblack-5 shadow-richblack-50 "
              placeholder="Enter New Password"
              onChange={(e) => {
                setPassword({ ...password, pass: e.target.value });
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

          <div className="flex flex-col gap-2 mt-4">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confiirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              value={password?.confirmPass}
              className="bg-richblack-700 p-3 rounded-md cursor-text shadow-[0_1px_0_0] text-richblack-5 shadow-richblack-50"
              placeholder="Confirm New Password"
              onChange={(e) => {
                setPassword({ ...password, confirmPass: e.target.value });
              }}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            Reset Password
          </button>
        </form>

        <Link to="/login">
          <div className="text-richblue-200">Back to Login</div>
        </Link>
      </div>
    </div>
  );
};

export default UpdatePassword;
