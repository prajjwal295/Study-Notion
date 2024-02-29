import React from "react";

const ExploreCards = ({
  currentCard,
  setCurrentCard,
  lession,
  heading,
  description,
  level,
}) => {
  return (
    <div>
      <div
        className={`flex flex-col cursor-pointer ${
          currentCard === heading
            ? "bg-white text-black shadow-[12px_12px_0_0] shadow-yellow-50 "
            : "bg-[#161d29] transition-all duration-200 hover:bg-richblack-900"
        } gap-2 p-8 h-[300px] w-[360px] divide-y divide-dashed justify-between`}
        onClick={() => {
          setCurrentCard(heading);
        }}
      >
        <div>
          <h1 className="font-bold text-lg">{heading}</h1>
          <p
            className={`${
              currentCard === heading
                ? "text-richblack-300"
                : "text-richblack-200"
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
