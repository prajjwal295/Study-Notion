import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from "../components/core/HomePage/CTAbutton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguage from "../components/core/HomePage/LearningLanguage";
import InstructorPage from "../components/core/HomePage/InstructorPage";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";

const Home = () => {
  const { token } = useSelector((store) => store.auth);
  return (
    <div className="">
      {/* {section1} */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between">
        <Link to={"/signin"}>
          <div className="group mx-auto mt-10 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor / Start Learning</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          <div className="pr-2">Empower Your Future with</div>
          <div className="text-richblue-100">Coding Skills</div>
        </div>

        <div className="mx-auto mt-4 text-richblack-300 w-[90%] text-center text-s line-clamp-2 font-bold">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          {token ? (
            <>
              <CTAbutton active={true} linkTo={"/dashboard/my-courses"}>
                Go to Dashboard
              </CTAbutton>
              <CTAbutton active={false} linkTo={"/dashboard/my-courses"}>
                Your Courses
              </CTAbutton>
            </>
          ) : (
            <>
              <CTAbutton active={true} linkTo={"/signup"}>
                Learn Something New
              </CTAbutton>
              <CTAbutton active={false} linkTo={"/login"}>
                Book Demo
              </CTAbutton>
            </>
          )}
        </div>

        <div className="mx-4 my-12 w-[70%] shadow-blue-200">
          <video autoPlay loop muted>
            <source src={Banner}></source>
          </video>
        </div>

        <div className="w-[90%] flex flex-col">
          <CodeBlock
            position={"lg:flex-row"}
            heading={
              <div className="mx-auto font-semibold text-3xl">
                Unnlock Your
                <span className="mx-2 text-richblue-100">Coding Potential</span>
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
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
            position={"lg:flex-row-reverse"}
            heading={
              <div className="mx-auto font-semibold text-3xl">
                Start
                <span className="mx-3 text-richblue-100">
                  Coding in seconds
                </span>
                with our online courses
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
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
        {/* <ExploreMore /> */}
      </div>

      {/* {section2} */}

      <div className="text-richblack-700 bg-[#f9f9f9] ">
        {/* <div className="homepage-bg h-[200px]">
          <div className="flex w-11/12 items-center mx-auto max-w-maxContent justify-between">
            <div className="flex flex-row gap-7  text-white pt-[180px]">
              <CTAbutton active={true} linkTo={"/catalog/"}>
                <div className="flex flex-row gap-2 items-center">
                  Explore Full Catelog
                  <FaArrowRight />
                </div>
              </CTAbutton>
              <CTAbutton active={false} linkTo={"/learnMore"}>
                Learn More
              </CTAbutton>
            </div>
          </div>
        </div> */}

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between h-full gap-20 pb-10">
          <div className="flex justify-between mt-20">
            <div className="mx-auto font-semibold text-4xl w-[45%]">
              Get the Skills you need for a
              <span className="mx-2 text-richblue-100">
                Job that is in demand
              </span>
            </div>
            <div className="flex flex-col  w-[45%]  items-start gap-10">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAbutton active={true} linkTo={"/learnMore"}>
                Learn More
              </CTAbutton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguage />
        </div>
      </div>

      {/* {section3} */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between mb-10">
        <InstructorPage />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
