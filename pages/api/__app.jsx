import React from "react";
import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/HeroBanner";
import Product from "../components/Product";
import { client } from "../components/lib/client";

const Home = ({ productsData, bannerData }) => {
  const renderProducts = () => {
    return productsData?.map((product) => (
      <Product key={product._id} product={product} />
    ));
  };

  return (
    <main className="mx-5">
      <HeroBanner heroBannerData={bannerData} />

      <div className="my-10">
        <h2 className="text-center text-4xl font-bold mt-5">
          Best Selling Products
        </h2>
        <p className="text-center mb-5 font-mono">
          The best Huawei has to offer.
        </p>
        <div className="flex flex-wrap gap-[15px] justify-center items-center">
          {renderProducts()}
        </div>
      </div>

      <FooterBanner footerData={bannerData && bannerData[0]} />
    </main>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // Query for products
  const productsQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productsQuery);

  // Query for banner
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { bannerData, productsData },
  };
};