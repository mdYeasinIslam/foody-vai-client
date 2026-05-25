import BaseComponentHeroBanner from "@/src/@base/components/BaseComponentHeroBanner";
import AllProducts from "@/src/@modules/products/components/AllProducts";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <BaseComponentHeroBanner
        title="Products Room"
        bannerImg="/images/terms-condition/term-banner.webp"
      />

      <AllProducts />
    </React.Fragment>
  );
};

export default page;
