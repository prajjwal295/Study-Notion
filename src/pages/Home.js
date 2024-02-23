import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from "../components/core/HomePage/CTAbutton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlock";

const Home = () => {
  return (
    <div>
      {/* {section1} */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between">
        <Link to={"/signup"}>
          <div className="group mx-auto bg-[rgba(20,26,35,255)] rounded-full font-bold transition-all duration-200 hover:scale-95 mt-14">
            <div className="flex justify-between p-2 items-center transition-all duration-200 rounded-full group-hover:bg-richblack-800">
              <p className="mr-2">Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="flex mx-auto font-semibold text-3xl mt-4">
          <div className="pr-2">Empower Your Future with</div>
          <div className="text-richblue-100">Coding Skills</div>
        </div>

        <div className="mx-auto mt-4 text-richblack-300 w-[90%] text-center text-xs line-clamp-2">
          ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj
          ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj
          ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj
          ddnvjvcjvvj ddnvjvcjvvj
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAbutton active={true} linkTo={"/signup"}>
            Learn More
          </CTAbutton>
          <CTAbutton active={false} linkTo={"/login"}>
            Book Demo
          </CTAbutton>
        </div>

        <div className="mx-4 my-12 w-[70%] shadow-blue-200">
          <video autoPlay loop muted>
            <source src={Banner}></source>
          </video>
        </div>

        <div>
          <CodeBlock
            position={"flex-row"}
            heading={
              <div className="flex mx-auto font-semibold text-xl mt-4 gap-2">
                Unnlock Your
                <span className="text-richblue-100">Coding Potential</span> with
                our online courses
              </div>
            }
            subHeading={
              "ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj"
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn More",
              linkTo: "/Login",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          ></CodeBlock>

          <CodeBlock
            position={"flex flex-row-reverse"}
            heading={
              <div className="flex mx-auto font-semibold text-xl mt-4 gap-2">
                Unnlock Your
                <span className="text-richblue-100">Coding Potential</span> with
                our online courses
              </div>
            }
            subHeading={
              "ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj ddnvjvcjvvj"
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn More",
              linkTo: "/Login",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          ></CodeBlock>
        </div>
      </div>

      {/* {section2} */}

      {/* {section3} */}

      {/* footer */}
    </div>
  );
};

export default Home;
