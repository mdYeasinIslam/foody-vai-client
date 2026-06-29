import Footer from "@/src/@base/layout/Footer";
import LandingHeader from "@/src/@base/layout/LandingHeader";
import LandingHeaderCopy from "@/src/@base/layout/LandingHeaderCopy";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {/* <LandingHeaderCopy /> */}
      {children}
      {/* <Footer /> */}
    </main>
  );
};

export default layout;
