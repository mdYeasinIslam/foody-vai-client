import MenuItems from "@/src/@modules/home/components/MenuItems";
import React from "react";
import NavbarMenuItemsOptional from "../components/NavbarMenuItemsOptional";

const LandingLayoutWithMenuItems = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section>
      <div className="container">
        <NavbarMenuItemsOptional/>
        <hr className="hidden md:block  text-gray-300" />
        <div className=" grid lg:grid-cols-8 ">
          <aside className="hidden lg:block col-span-2 w-full">
            {/* <MenuItems className="[&_.ant-menu-item]:border [&_.ant-menu-item]:border-gray-200   [&_.ant-menu-submenu]:border  [&_.ant-menu-submenu]:border-gray-200  " /> */}
            <MenuItems className="h-100 2xl:h-116 overflow-y-scroll hidden_scrollbar" />
          </aside>
          <aside className="col-span-6 flex-1 w-full">{children}</aside>
        </div>
      </div>
    </section>
  );
};

export default LandingLayoutWithMenuItems;
