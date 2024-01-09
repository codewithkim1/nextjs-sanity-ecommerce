import React from "react";
import Link from "next/link";
import { urlFor } from "./lib/client";

const FooterBanner = ({
  footerData: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <div className="bg-[#f02d34] rounded-lg max-w-[140000px] max-h-[50vh] text-white">
      <div className=" px-10 py-10 relative flex justify-between">
        <section className="flex-1">
          <p className="2xl">{discount}</p>
          <h3 className="text-6xl font-bold">{largeText1}</h3>
          <h3 className="text-6xl font-bold">{largeText2}</h3>
          <p className="2xl">{saleTime}</p>
        </section>
        <section className="flex-1 pt-24 w-40%">
          <p className="text-2xl md:text-6xl">{smallText}</p>
          <p>{midText}</p>
          <p className="hidden md:block">{desc}</p>
          <Link href={`/product/${product}`}>
            <button className="px-2 py-2 text-[] bg-white text-[#f02d34] rounded-3xl">
              {buttonText}
            </button>
          </Link>
        </section>
        <img
          src={urlFor(image)}
          className="absolute top-3 md:top-0  md:w-96 right-0 md:left-0 md:m-auto w-[200px]"
        />
      </div>
    </div>
  );
};

export default FooterBanner;
