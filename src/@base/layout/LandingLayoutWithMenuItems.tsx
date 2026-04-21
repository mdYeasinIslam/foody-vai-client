'use client'
import MenuItems from "@/src/@modules/home/components/MenuItems";
import React from "react";
import NavbarMenuItemsOptional from "../components/NavbarMenuItemsOptional";
import { usePathname } from "next/navigation";

const LandingLayoutWithMenuItems = ({
  children,
}: {
  children: React.ReactNode;
  }) => {
  const path = usePathname()
  console.log(path)
  return (
    <section>
      <div className="container">
        <NavbarMenuItemsOptional/>
        <hr className="hidden md:block  text-gray-300" />
        <div className=" grid lg:grid-cols-8 ">
          <aside className="hidden lg:block col-span-2 w-full">
            <MenuItems className="h-100 2xl:h-116 overflow-y-scroll hidden_scrollbar" />
          </aside>
          <aside className="col-span-6 flex-1 w-full">{children}</aside>
        </div>
      </div>
    </section>
  );
};

export default LandingLayoutWithMenuItems;
