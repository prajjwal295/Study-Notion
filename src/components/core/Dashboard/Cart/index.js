import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((store) => store.cart);
  console.log(total);

  return (
    <div>
      <h1 className="section_heading">Your Cart</h1>
      <p className="text-white">{totalItems} Courses in Cart</p>

      {total > 0 ? (
        <div>
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
