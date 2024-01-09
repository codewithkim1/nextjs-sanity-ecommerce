import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>VDIAL PHONES</title>
      </Head>

      <header>
        <Navbar />
      </header>
      <main className="max-w-[1400px] flex flex-col justify-center items-center w-[100%] m-auto">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
