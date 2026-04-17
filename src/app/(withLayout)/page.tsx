import LandingBannerWithMenuItems from "@/src/@modules/home/components/LandingBannerWithMenuItems";
import AllProducts from "@/src/@modules/products/components/AllProducts";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <LandingBannerWithMenuItems />
      <AllProducts/>
    </React.Fragment>
  );
};

export default page;
