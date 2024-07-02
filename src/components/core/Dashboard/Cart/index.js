import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { resetCart } from "../../../../utils/cartSlice";

const Cart = () => {
  const { total, totalItems } = useSelector((store) => store.cart);
  console.log(total);

  // const dispatch = useDispatch();
  // dispatch(resetCart());

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="section_heading">Your Cart</h1>
        <p className="text-white">{totalItems} Courses in Cart</p>
      </div>

      {total > 0 ? (
        <div className="flex flex-col gap-10">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div>Your Cart is Empty</div>
      )}
    </div>
  );
};

export default Cart;
