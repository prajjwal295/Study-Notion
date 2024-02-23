import React from "react";
import CTAbutton from "./CTAbutton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeBlock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} justify-between my-20 gap-10`}>
      {/* section 1 */}
      <div className="max-w-[50%] flex flex-col gap-8  items-center">
        {heading}
        <div className="mx-auto text-richblack-300  text-center text-xs font-bold ">
          {subHeading}
        </div>
        <div className="flex gap-7 my-5">
          <CTAbutton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAbutton>

          <CTAbutton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
            {ctabtn2.btnText}
          </CTAbutton>
        </div>
      </div>

      {/* section 2 */}

      <div
        className={`flex flex-row h-fit text-[10px] w-[100%] lg:w-[500px] ${backgroundGradient}`}
      >
        {/* homework bg gradient */}

        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div
          className={`text-xs font-semibold w-[90%] flex flex-col gap-2 font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeBlock, 2000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{ whiteSpace: "pre-line", display: "block" }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
