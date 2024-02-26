import React from "react";
import CTAbutton from "./CTAbutton";
import KnowYourProgress from "../../../assets/Images/Know_your_progress.svg";
import CompareWithOthers from "../../../assets/Images/Compare_with_others.svg";
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguage = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-16">
        <div className="flex gap-2 font-bold text-4xl mb-5">
          <h1 className="">Your swiss knife for</h1>
          <span className="text-richblue-100">learning any language</span>
        </div>
        <div className="text-sm font-bold w-[70%]  text-center">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex items-center justify-center">
          <img src={KnowYourProgress} className="object-contain -mr-32"></img>
          <img
            src={CompareWithOthers}
            className="object-contain"
          ></img>
          <img src={PlanYourLessons} className="object-contain -ml-36"></img>
        </div>

        <CTAbutton active={true}>Start Learning Today</CTAbutton>
      </div>
    </div>
  );
};

export default LearningLanguage;
