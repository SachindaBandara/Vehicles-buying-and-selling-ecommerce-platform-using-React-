import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Silde";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slide/>
      <Categories/>
      <Listings/>
      <Footer/>
    </>
  );
};

export default Home;
