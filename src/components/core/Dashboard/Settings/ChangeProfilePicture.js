import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import IconBtn from "../../../common/IconBtn";
import { useEffect } from "react";
import { updateDisplayPicture } from "../../../../services/operations/SettingAPI";

const ChangeProfilePicture = () => {
  const { token } = useSelector((store) => store.auth);
  const {user} = useSelector((store) => store.profile);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [error,setError] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setImage(file);
      previewFile(file);
      setError(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      if(!image)
      {
        setError("Please Select a Image")
        return;
      }
      console.log("uploading...");
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", image);
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (image) {
      previewFile(image);
    }
  }, [image]);

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="font-bold">Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtn>
          </div>
          {error && <span className="mt-1 text-[12px] text-yellow-100">
                  {error}
                </span>}
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
