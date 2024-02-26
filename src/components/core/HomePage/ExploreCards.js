import React from "react";

const ExploreCards = ({ active, lession, heading, description, level }) => {
  return (
    <div>
      <div
        className={`flex flex-col ${
          active
            ? "bg-white text-black border-spacing-y-96 border-r-[16px] border-b-[16px]  border-yellow-50 "
            : "bg-[#161d29]"
        } gap-2 p-8 h-[300px] w-[360px] divide-y divide-dashed justify-between`}
      >
        <div>
          <h1 className="font-bold text-lg">{heading}</h1>
          <p
            className={`${
              active ? "text-richblack-300" : "text-richblack-200"
            } font-medium mt-6`}
          >
            {description}
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mt-10 text-blue-200 font-bold ">
            <p>{level}</p>
            <p>{lession} lessons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCards;
