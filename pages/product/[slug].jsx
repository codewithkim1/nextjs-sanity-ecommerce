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

// Destructure the product and products props
const ProductDetails = ({ product, products }) => {
  // Bring in global state from the VDialContext
  const { qty, qtyDecrement, qtyIncrement, onAdd, setShowCart } =
    UseVdialContext();

  // State to manage the index of the selected image
  const [index, setIndex] = useState(0);

  // Destructure product details
  const { name, details, price, image } = product;

  return (
    <section className="pt-8 px-5 text-[#324d67]">
      <div className="block md:flex md:gap-16">
        <div>
          {/* Display the main product image */}
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt="image container"
              className="h-60vh md:h-[65vh] object-contain w-full  md:w-[50vw] rounded-xl shadow-lg"
            />
          </div>
          {/* Display small images for selection */}
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
          {/* Product name */}
          <h1 className=" text-6xl pt-5 md:pt-2 text-center md:text-left">
            {name}
          </h1>
          {/* Star rating and reviews */}
          <div className="text-center flex items-center justify-center md:justify-start">
            <AiFillStar className="text-2xl text-red-600" />
            <AiFillStar className="text-2xl text-red-600" />
            <AiFillStar className="text-2xl text-red-600" />
            <AiFillStar className="text-2xl text-red-600" />
            <AiOutlineStar className="text-2xl text-red-600" />
            <p>(20)</p>
          </div>
          {/* Product details */}
          <div className="py-5">
            <h3 className="font-bold text-xl md:text-2xl">Details</h3>
            <p>{details}</p>
          </div>
          {/* Product price */}
          <h3 className="py-3 text-xl font-bold text-red-700">Kshs {price}</h3>

          {/* Quantity selection */}
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
            {/* Add to Cart and Buy Now buttons */}
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

      {/* Display related products */}
      <article className="py-10">
        <h1 className="text-center text-4xl font-bold">
          Products You May Also Like
        </h1>
        <section className="py-4">
          <div className="flex justify-center items-center flex-wrap gap-5">
            {/* Render related products using the Product component */}
            {products.map((item) => (
              <Product product={item} key={item._id} />
            ))}
          </div>
        </section>
      </article>
    </section>
  );
};

// Static paths generation for dynamic routing
export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

  const product = await client.fetch(query);

  // Generate paths based on product slugs
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

// Static props fetching for each product
export const getStaticProps = async ({ params: { slug } }) => {
  // Query for the specific product
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const productsQuery = '*[_type == "product"]';

  // Fetch individual product and all products
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
