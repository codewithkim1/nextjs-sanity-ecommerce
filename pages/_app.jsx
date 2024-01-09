import "../styles/globals.css";
import Layout from "../components/Layout";
import { VDialContext } from "../context/VDialContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <VDialContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </VDialContext>
  );
}

export default MyApp;
