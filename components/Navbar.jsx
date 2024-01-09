import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { BsPhoneLandscape } from "react-icons/bs";
import Cart from "./Cart";
import { UseVdialContext } from "../context/VDialContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = UseVdialContext();
  return (
    <nav className="h-16 flex justify-between items-center mx-5">
      <section className=" text-gray-700 cursor-pointer">
        <div>
          <Link href="/">
            <a>
              <h1 className="text-2xl flex items-center">
                VDIAL
                <BsPhoneLandscape />
              </h1>
            </a>
          </Link>
        </div>
      </section>
      <section className="relative">
        <button onClick={() => setShowCart(!showCart)}>
          <AiOutlineShopping size={40} />
          <h6 className="absolute w-5 h-5 bg-red-600 flex items-center justify-center text-white rounded-full top-1 right-[-3]">
            {totalQuantities}
          </h6>
        </button>
      </section>
      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
