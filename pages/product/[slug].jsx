import React, { useState } from "react";
import { client, urlFor } from "../../components/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../components/Product";
import { UseVdialContext } from "../../context/VDialContext";

const ProductDetails = ({ product, products }) => {
  // Bring in global state
  const { qty, qtyDecrement, qtyIncrement, onAdd, setShowCart } =
    UseVdialContext();

  const [index, setIndex] = useState(0);

  const { name, details, price, image } = product;
  return (
    <section className="pt-8 px-5 text-[#324d67]">
      <div className="block md:flex md:gap-16">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt="image container"
              className="h-60vh md:h-[65vh] object-contain w-full  md:w-[50vw] rounded-xl shadow-lg"
            />
          </div>
          <div className="smallimages flex gap-5 py-4">
            {image.map((item, index) => (
              <img
                key={index}
                src={urlFor(item)}
                className="w-14 h-20 object-contain rounded-md shadow-md p-2 border-gray-300 border-[.5px] border-solid"
                onMouseOver={() => setIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="desc">
          <h1 className=" text-6xl pt-5 md:pt-2 text-center md:text-left">
            {name}
          </h1>
          <div className="text-center flex items-center justify-center md:justify-start">
            <AiFillStar className="text-2xl text-red-600" />
            <AiFillStar className="text-2xl text-red-600" />
            <AiFillStar className="text-2xl text-red-600" />
            <AiFillStar className="text-2xl text-red-600" />
            <AiOutlineStar className="text-2xl text-red-600" />
            <p>(20)</p>
          </div>
          <div className="py-5">
            <h3 className="font-bold text-xl md:text-2xl">Details</h3>
            <p>{details}</p>
          </div>
          <h3 className="py-3 text-xl font-bold text-red-700">Kshs {price}</h3>

          <div className=" items-center">
            <p className="pr-5">Quantity:</p>
            <div className="border-[2px] border-solid border-[#324d67] flex  w-40 items-center justify-between ">
              <button
                className="flex-1 flex items-center justify-center"
                onClick={qtyDecrement}
              >
                <AiOutlineMinus size={20} color="red" />
              </button>
              <div className="text-2xl border-x-[#324d67] px-3 border-2 flex-1 flex items-center justify-center">
                {qty}
              </div>
              <button
                className="flex-1 flex items-center justify-center"
                onClick={qtyIncrement}
              >
                <AiOutlinePlus size={20} color="green" />
              </button>
            </div>
            <section className="py-5 flex justify-center items-center gap-14 md:justify-start">
              <button
                className="w-36 p-3 border-[2px] border-red-700 text-white bg-red-700 hover:scale-105 duration-700"
                onClick={() => onAdd(product, qty)}
              >
                Add to Cart
              </button>
              <button className="w-36 p-3 border-[2px] border-red-700 text-red-700 bg-white-700 hover:scale-105 duration-700" onClick={() => setShowCart(true)}>
                {" "}
                Buy Now
              </button>
            </section>
          </div>
        </div>
      </div>
      <article className="py-10">
        <h1 className="text-center text-4xl font-bold">
          Products You May Also Like
        </h1>
        <section className="py-4">
          <div className="flex justify-center items-center flex-wrap gap-5">
            {products.map((item) => (
              <Product product={item} key={item._id} />
            ))}
          </div>
        </section>
      </article>
    </section>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

  const product = await client.fetch(query);

  const paths = product.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // query for product
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
