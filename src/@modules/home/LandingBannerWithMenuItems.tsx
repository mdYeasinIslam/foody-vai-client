import React from "react";
import MenuItems from "./MenuItems";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";

interface IProps {
  className?: string;
}
const LandingBannerWithMenuItems: React.FC<IProps> = () => {
  return (
    <section>
      <div className="container grid lg:grid-cols-8">
        <aside className="hidden lg:block col-span-2 w-full">
          <div className="flex items-center gap-4 px-2 xl:px-4 py-2 ">
            <IoMenu className="w-6 h-auto xl:w-7 xl:h-7" />
            <p className="font-semibold text-base xl:text-lg uppercase">Shop By Category</p>
          </div>
          <hr  className="text-gray-300"/>
          <MenuItems className="" />
        </aside>
        <aside className="col-span-6  w-full">
          <div className="flex items-center  gap-0">
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
              <div key={item} className="flex items-center ">
                <p className="px-2 xl:px-4 py-2 text-base xl:text-lg font-medium">{item}</p>
                {index < 7 && <div className="h-10 xl:h-5 w-px bg-gray-300"></div>}
              </div>
            ))}
          </div>
          <hr className="text-gray-300" />
          <div className="flex flex-col md:flex-row justify-center gap-4 pt-1">
            <div className="w-full">
              <Image
                src={"/images/home/banner1.png"}
                alt="banner image"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div className="w-full">
              <Image
                src={"/images/home/banner2.png"}
                alt="banner image"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default LandingBannerWithMenuItems;
