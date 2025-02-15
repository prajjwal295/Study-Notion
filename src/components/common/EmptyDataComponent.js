import react from "react";
import IconBtn from "./IconBtn";
import logo from "../../assets/Images/cart.png";

const EmptyDataComponent = ({ text, subtext, onclick }) => {

    const buttonText = "Go To " + text;
    return (
        <>
            <div className="border-richblack-700 bg-richblack-800 p-8 md:px-12 flex flex-col md:flex-row sm:items-center min-w-max
            rounded-md h-[400px] justify-between md:items-start mt-5">
                <div className="text-white w-full h-full flex-[0.9] flex ">
                    <img src={logo} alt="Empty Cart" className="m-auto h-full " />
                </div>
                <div className="flex flex-col md:flex-col-reverse  gap-2 items-center">
                    <div>
                        <p className="text-sm  text-white">{subtext}</p>
                    </div>
                    <div>
                        <IconBtn
                            text={buttonText}
                            onclick={onclick}
                            customClasses="w-full justify-center"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmptyDataComponent;