import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/authApi";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupdata } = useSelector((store) => store.auth);

  console.log({ signupdata });

    useEffect(() => {
      if (!signupdata) {
        navigate("/signin");
      }
    },[]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      accountType,
    } = signupdata;

    dispatch(
      signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        accountType,
        otp,
        navigate
      )
    );
  };
  return (
    <div className="grid place-items-center mt-32">
      <div className="max-w-[500px] p-4 lg:p-8 flex flex-col gap-5">
        <h1 className="font-bold text-richblack-5 text-3xl">Verify Email</h1>
        <p className="w-full text-richblack-5 text-sm">
          A verification code has been sent to you.Enter the code Below
        </p>
        <form onSubmit={handleOnSubmit}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            Verify Email
          </button>
        </form>

        <div className="flex justify-between">
          <Link to="/login">
            <div className="text-blue-200">Back to Login</div>
          </Link>

          <button
            className="text-blue-200"
            onClick={() => {
              dispatch(sendOtp(signupdata.email, navigate));
            }}
          >
            {" "}
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
