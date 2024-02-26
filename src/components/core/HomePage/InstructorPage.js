import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAbutton from "./CTAbutton";
import { FaArrowRight } from "react-icons/fa";

const InstructorPage = () => {
  return (
    <div>
      <div className="flex gap-10 pt-20 h-[50vw] items-center">
        <div className="shadow-lg shadow-white w-[70%]">
          <img src={Instructor} alt="instructor img" className="w-full" />
        </div>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex gap-2 font-bold text-5xl">
            <h1>Become an</h1>
            <span className="text-richblue-100">Instructor</span>
          </div>
          <div className="text-sm font-semibold w-[80%] mb-5 text-richblue-50">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>
          <CTAbutton active={true}>
            <div className="flex flex-row gap-2 items-center w-full">
              Start Teaching today
              <FaArrowRight />
            </div>
          </CTAbutton>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
