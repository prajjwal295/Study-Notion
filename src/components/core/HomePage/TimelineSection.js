import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineLogo from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "fully commited to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex justify-between gap-28 items-center w-full">
        <div className="flex flex-col gap-10 items-start">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-6 items-center p-2" key={index}>
                <div className="shadow-lg rounded-full">
                  <img
                    src={element.logo}
                    className="p-4  h-16 w-16 rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg">{element.heading}</h1>
                  <p className="semibold text-sm">{element.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative shadow-2xl shadow-blue-400 ">
          <div className="w-[600px]">
            <img src={TimeLineLogo} className="w-full"></img>
          </div>
          <div className="absolute bg-[#014a32] flex text-white uppercasepy-10 w-[80%] left-[50%] justify-between h-[100px] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex items-center justify-between px-5 text-center">
              <p className="font-bold text-3xl">10</p>
              <p className="font-bold text-2xl w-[50%]">Years of experience</p>
            </div>
            <div className="flex items-center justify-between  px-5">
              <p className="font-bold text-3xl">250</p>
              <p className="font-bold text-2xl w-[50%]">Type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
