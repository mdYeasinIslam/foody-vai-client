"use client";
import Banner from "@/src/@modules/about/components/Banner";
import Categories from "@/src/@modules/about/components/Categories";
import Footer from "@/src/@modules/about/components/Footer";
import Hero from "@/src/@modules/about/components/Hero";
import Marquee from "@/src/@modules/about/components/Marquee";
import Nav from "@/src/@modules/about/components/Nav";
import Newsletter from "@/src/@modules/about/components/Newsletter";
import NotifyToast from "@/src/@modules/about/components/NotifyToast";
import Products from "@/src/@modules/about/components/Products";
import { useState } from "react";

const Page = () => {
  const [filterCat, setFilterCat] = useState("all");

  const handleFilter = (cat: string) => {
    setFilterCat(cat);
    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };
  return (
    <div>
      <Nav />
      <Hero />
      <Marquee />
      <Categories onFilter={handleFilter} />
      <Products filterCat={filterCat} />
      <Banner />
      <Newsletter />
      <Footer />
      <NotifyToast />
    </div>
  );
};

export default Page;
