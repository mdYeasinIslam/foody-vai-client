import LandingBannerWithMenuItems from "@/src/@modules/home/components/LandingBannerWithMenuItems";
import ShopSmarterSection from "@/src/@modules/home/components/ShopSmarterSection";
import WhyChooseUs from "@/src/@modules/home/components/WhyChooseUs";
import AllProducts from "@/src/@modules/products/components/AllProducts";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <LandingBannerWithMenuItems />
      <AllProducts />
      <WhyChooseUs className='mt-10'/>
      <ShopSmarterSection className='mt-10'/>
    </React.Fragment>
  );
};

export default page;
