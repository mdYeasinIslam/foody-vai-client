import NavbarMenuItemsOptional from "@/src/@base/components/NavbarMenuItemsOptional";
import Footer from "@/src/@base/layout/Footer";
import LandingHeader from "@/src/@base/layout/LandingHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <LandingHeader />
      <NavbarMenuItemsOptional />

      {children}
      <Footer />
    </main>
  );
};

export default layout;
