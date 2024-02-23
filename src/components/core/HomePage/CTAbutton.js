import React from "react";
import { Link } from "react-router-dom";

const CTAbutton = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold transition-all duration-200 hover:scale-95 ${
          active
            ? "bg-yellow-50   text-black"
            : "bg-richblack-800 text-white"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAbutton;
