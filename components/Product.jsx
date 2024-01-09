import React from "react";
import Link from "next/link";
import { urlFor } from "./lib/client";
import banner from "../ecomerce/schemas/banner";

const Product = ({ product: { image, slug, name, price } }) => {
  return (
    <div className="cursor-pointer">
      <Link href={`/product/${slug.current}`}>
        {/* Product card */}
        <div>
          <img
            src={urlFor(image && image[0])}
            className="rounded-lg shadow-lg border w-[250px] h-[250px] object-contain"
          />
          <p>{name}</p>
          <p className="font-bold">Kshs. {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
