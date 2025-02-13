import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { changePassword } from '../../../../services/operations/authApi';

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [data, setData] = useState({
    old: "",
    new: ""
  });

  const [errors, setErrors] = useState({
    old: null,
    new: null
  });

  const [err, setErr] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { old: null, new: null };

    if (!data.old) {
      newErrors.old = "Old password is required.";
      valid = false;
    }
    if (!data.new) {
      newErrors.new = "New password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErr(true);
      return;
    }

    const response = await changePassword(
      user.email,
      data.old,
      data.new,
      token
    );

    if (!response) {
      setErr(true);
    } else {
      setData({ old: "", new: "" });
      setErr(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='my-10 flex flex-col gap-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <div className='flex flex-col gap-5'>
          <h2 className="text-lg font-semibold text-richblack-5">
            Update Password
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row text-white">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style">
                Old Password
              </label>
              <input
                type="password" // It's better to use 'password' type for security
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Older Password"
                className="form-style bg-richblack-300 p-2 rounded-md"
                value={data.old}
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    old: e.target.value
                  }));
                }}
              />
              {errors.old && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.old}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type="password" // Also better to use 'password' type here
                name="newPassword"
                id="newPassword"
                placeholder="Enter Newer Password"
                className="form-style bg-richblack-300 p-2 rounded-md"
                value={data.new}
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    new: e.target.value
                  }));
                }}
              />
              {errors.new && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.new}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          {err && (
            <span className="mt-1 text-[12px] text-red-400">
              Password Updation Failed
            </span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button" // Ensure this doesn't trigger the form submit
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </div>
    </form>
  )
}

export default UpdatePassword;
