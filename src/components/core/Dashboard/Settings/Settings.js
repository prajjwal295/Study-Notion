import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
  return (
    <>
      <h1 className="mb-10 text-3xl font-bold text-richblack-5">
        Edit Profile
      </h1>
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword /> 
      {/* Delete Account */}
      <DeleteAccount />
    </>
  );
}
