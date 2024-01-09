import { useEffect, useRef } from "react";
import React from "react";
import Link from "next/link";
import { TiDeleteOutline } from "react-icons/ti";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";
import { UseVdialContext } from "../context/VDialContext";
import { urlFor } from "./lib/client";

const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    removeFromCart,
  } = UseVdialContext();

  const CartRef = useRef();

  return (
    <article ref={CartRef} className="cart-wrapper">
      {/* container */}
      <section className="cart-container w-[100vw] md:w-[600px]">
        <button
          onClick={() => setShowCart(false)}
          className="flex gap-3 items-center"
        >
          <AiOutlineLeft size={30} fontWeight="bold" color="red" />
          <span className="font-bold text-3xl ">Your Cart</span>
          <span className="text-red-500 text-3xl">
            ({totalQuantities} Items)
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="pt-20 flex flex-col justify-center items-center">
            <AiOutlineShopping size={160} />
            <h3>Your Cart is empty.</h3>

            <Link href="/">
              <button
                className="my-10 w-[50%] mx-6 p-2 text-white bg-red-600 rounded-lg"
                onClick={() => setShowCart(false)}
              >
                Let's go shopping!
              </button>
            </Link>
          </div>
        )}
        {/* In-cart products */}
        <div className="text-[#324d67] py-3 h-[60vh] overflow-scroll scrollbar overflow-x-hidden">
          {cartItems?.map((item) => (
            <div key={item._id} className="flex py-4">
              <img
                src={urlFor(item?.image[0])}
                className="w-20 h-20 rounded-lg"
              />
              <div className="ml-5 md:ml-10">
                <div className="flex justify-between w-[250px] md:w-[350px] flex-wrap items-center">
                  <h5 className="text-2xl md:text-3xl">{item.name}</h5>
                  <h4 className="font-bold md:text-xl">{item.price}/-</h4>
                </div>
                <div className="flex justify-between  ">
                  <div className="py-3 flex items-center w-[250px] md:w-[350px] justify-between ">
                    <div className=" flex w-24 md:w-40 items-center justify-between">
                      <p>
                        Quantity :{" "}
                        <span className="font-bold text-red-600">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                    <div>
                      <MdOutlineCancel
                        size={25}
                        color="red"
                        className="hover:scale-110 duration-700"
                        onClick={() => removeFromCart(item._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems?.length >= 1 && (
          <div className=" absolute bottom-[0px] right-[5px] w-[100%] pt-[15px] px-[65px]">
            <div className="w-full flex justify-between items-center text-[#324d67]">
              <h3 className="text-lg md:text-2xl">SubTotal:</h3>
              <h3 className="text-2xl md:text-4xl">Kshs: {totalPrice}</h3>
            </div>
            <section className="py-3">
              <button
                className="w-full py-2 bg-green-600 rounded-xl my-2 text-white font-bold"
                onClick={() => toast.error("Mpesa support coming soon")}
              >
                Pay with Mpesa
              </button>
            </section>
          </div>
        )}
      </section>
    </article>
  );
};

export default Cart;
