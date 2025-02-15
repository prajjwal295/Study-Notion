import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { resetCart } from "../../../../utils/cartSlice";
import EmptyDataComponent from "../../../common/EmptyDataComponent";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { total, totalItems } = useSelector((store) => store.cart);
  console.log(total);
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate("/catelog")
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="section_heading">Your Cart</h1>
      </div>

      {total > 0 ? (
        <div className="flex flex-col gap-10">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <EmptyDataComponent text="Catelog" subtext={"Your Cart is Empty, Add Items from Catelogs."} onclick={handleClick}/>
      )}
    </div>
  );
};

export default Cart;
