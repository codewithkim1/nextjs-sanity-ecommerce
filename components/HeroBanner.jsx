import Link from "next/link";
import React from "react";

import { urlFor } from "./lib/client";

const HeroBanner = ({ heroBannerData }) => {
  const banner = heroBannerData[0];
  return (
    <section className="bg-[#dcdcdc] max-w-[140000px] h-[500px]  rounded-lg">
      <div className="pl-5 md:pl-10 pt-5 md:pt-20 relative">
        <p className="text-4xl"> HUAWEI {banner.smallText}</p>
        <h3>{banner.midText}</h3>
        <h1 className=" text-4xl md:text-9xl font-bold text-white text-center pt-5 md:pt-16">
          {banner.product}
        </h1>
        <img
          src={urlFor(banner.image)}
          alt="header image"
          className="md:w-[600px] md:absolute md:top-0 md:left-0 md:right-0 md:m-auto"
        />
        <div>
          <Link href={`/product/${banner.product}`}>
            <button className="bg-[#f02d34] py-2.5 px-4 rounded-3xl text-white font-bold hover:scale-105 duration-700">
              {banner.buttonText}
            </button>
          </Link>
        </div>
        <article className="float-right">
          <h3 className="font-bold ">Description</h3>
          <p className="w-[250px] font-thin">{banner.desc}</p>
        </article>
      </div>
    </section>
  );
};

export default HeroBanner;
