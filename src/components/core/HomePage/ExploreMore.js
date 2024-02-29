import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import ExploreCards from "./ExploreCards";

const tabsName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skills Paths",
  "Career Paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0]?.courses);
    setCurrentCard(result[0]?.courses[0]?.heading);
  };
  return (
    <div className="flex flex-col gap-2 items-center absolute -bottom-48">
      <div className="flex gap-2 font-bold text-4xl mb-5">
        <p>Unlock the</p>
        <span className="text-richblue-200">Power of Code</span>
      </div>

      <p>Learn to Build Anything You Can Imagine</p>

      <div className="flex mt-4 gap-2  bg-[#161d29] rounded-full border-richblack-100 ">
        {tabsName.map((tab, index) => {
          return (
            <div
              className={`p-3 mx-2 text-sm rounded-full duration-200 cursor-pointer text-[16px] flex items-center gap-2 ${
                currentTab === tab
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => {
                 console.log({ tab });
                setMyCards(tab);
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="flex gap-12 my-10 ">
        {courses.map((course, index) => {
          return (
            <ExploreCards
              heading={course?.heading}
              description={course?.description}
              level={course?.level}
              lession={course?.lessionNumber}
              key={index}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
