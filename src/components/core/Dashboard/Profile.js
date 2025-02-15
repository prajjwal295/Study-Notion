import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <>
      <h1 className="mb-10 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 md:px-12 ">
        <div className="flex items-center gap-x-4 flex-col md:flex-row ">
          <img
            src={userData?.image}
            alt={`profile-${userData?.firstName}`}
            className="aspect-square max-w-[78px] w-auto rounded-full object-cover"
          />
          <div className="space-y-1  mt-2 flex flex-col items-center md:items-start md:mt-0">
            <p className="text-lg font-semibold text-richblack-5">
              {userData?.firstName + " " + userData?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{userData?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
            } text-sm font-medium`}
        >
          {userData?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {userData?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {userData?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {userData?.additionalDetails?.gender ? userData?.additionalDetails?.gender : "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {userData?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {userData?.additionalDetails?.contact ? userData?.additionalDetails?.contact : "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {/* {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"} */}
                {userData?.additionalDetails?.dob ? userData?.additionalDetails?.dob : "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
