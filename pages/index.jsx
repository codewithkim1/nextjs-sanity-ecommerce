import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/HeroBanner";
import { client } from "../components/lib/client";
import Product from "../components/Product";

const Home = ({ productsData, bannerData }) => {
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
          {productsData?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>

      <FooterBanner footerData={bannerData && bannerData[0]} />
    </main>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // query for products
  const productsQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productsQuery);

  // query for banner
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { bannerData, productsData },
  };
};
