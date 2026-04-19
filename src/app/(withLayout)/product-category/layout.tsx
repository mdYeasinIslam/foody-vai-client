import Footer from "@/src/@base/layout/Footer";
import LandingLayoutWithMenuItems from "@/src/@base/layout/LandingLayoutWithMenuItems";
import MenuItems from "@/src/@modules/home/components/MenuItems";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <LandingLayoutWithMenuItems>{children}</LandingLayoutWithMenuItems>
      <Footer />
    </main>
  );
};

export default layout;
