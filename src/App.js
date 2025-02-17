import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/common/NavBar";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/core/Dashboard/Profile";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import Settings from "./components/core/Dashboard/Settings/Settings";
import Cart from "./components/core/Dashboard/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Catalog from "./pages/Catelog";
import CourseDetails from "./pages/CourseDetails";
import Cat from "./pages/Cat";
import ViewCourse from "./pages/ViewCourse";
import PrivateRoute from "./hooks/PrivateRoute";

const App = () => {
  const { user } = useSelector((store) => store.profile);
  return (
    <div className="max-w-screen
    min-h-screen bg-richblack-900
     flex flex-col 
    font-inter w-full h-full">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="cat" element={<Cat />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route
          element={
             <PrivateRoute>
            <Dashboard />
              </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<Profile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {user !== null && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route path="dashboard/cart" element={<Cart />} />
          )}
          {user !== null && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="dashboard/enrolled-courses"
              element={<EnrolledCourses />}
            />
          )}
          {user !== null && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<ViewCourse />}
            />
          )}
          {user !== null && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
