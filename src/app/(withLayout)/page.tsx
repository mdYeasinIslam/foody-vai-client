import LandingBannerWithMenuItems from "@/src/@modules/home/components/LandingBannerWithMenuItems";
import WhyChooseUs from "@/src/@modules/home/components/WhyChooseUs";
import AllProducts from "@/src/@modules/products/components/AllProducts";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <LandingBannerWithMenuItems />
      <AllProducts />
      <WhyChooseUs/>
    </React.Fragment>
  );
};

export default page;
