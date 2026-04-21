import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { IoMenu } from "react-icons/io5";

const NavbarMenuItemsOptional = () => {
  return (
    <div className=" md:grid lg:grid-cols-8">
      <div className="col-span-2 hidden lg:flex items-center gap-4 py-2.5 ">
        <IoMenu className="w-6 h-auto xl:w-7 xl:h-7" />
        <p className="font-semibold text-base xl:text-lg uppercase">
          Shop By Category
        </p>
      </div>
      <div className="hidden_scrollbar w-full md:col-span-6 flex md:flex-wrap max-md:gap-2 max-md:overflow-x-scroll scroll-smooth ">
        {[
          "Offers",
          "Products",
          "Corporate",
          "Export",
          "Outlets",
          "Impact Stories",
          "Halal Investment",
          "Blog",
        ].map((item, index) => (
          <div
            key={item}
            className={cn(
              "flex flex-none items-center justify-center  max-md:bg-(--secondary-color-500) max-md:text-(--secondary-color-700) max-md:rounded-full shadow-md px-4 py-1.5 md:px-2.5 xl:px-4 md:py-2.5 max-md:my-1",
              index < 7 && "border-r border-gray-300",
              index === 0 && "hidden",
            )}
          >
            <p className={cn("text-sm xl:text-lg font-semibold")}>{item}</p>
            {/* {index < 7 && (
                  <div className="lg:h-10 xl:h-5 w-px bg-gray-300"></div>
                )} */}
          </div>
        ))}
      </div>
      <hr className="hidden md:block text-gray-300" />
    </div>
  );
};

export default NavbarMenuItemsOptional;
