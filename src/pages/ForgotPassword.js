import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordToken } from "../services/operations/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordToken(email, setEmailSent));
  };

  return (
    <div className="grid place-items-center pt-20">
      <div className="max-w-[500px] p-4 lg:p-8 flex flex-col gap-5">
        <h1 className="font-bold text-richblack-5 text-3xl">
          {!emailSent ? "Reset your password" : "Check email"}
        </h1>

        <p className="w-full text-richblack-5 text-sm">
          {!emailSent
            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`}
        </p>

        <form onSubmit={handleSubmit}>
          {!emailSent && (
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                value={email}
                className="bg-richblack-700 p-3 rounded-md cursor-text shadow-[0_1px_0_0] text-richblack-5 shadow-richblack-50"
                placeholder="Enter Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            {!emailSent ? "Sumbit" : "Resend Token"}
          </button>
        </form>

        <Link to="/login">
          <div className="text-richblue-200">Back to Login</div>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
