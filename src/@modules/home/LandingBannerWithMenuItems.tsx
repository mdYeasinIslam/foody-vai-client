import React from "react";
import MenuItems from "./MenuItems";
import Image from "next/image";

interface IProps {
  className?: string;
}
const LandingBannerWithMenuItems: React.FC<IProps> = () => {
  return (
    <section>
      <div className="container mx-auto grid grid-cols-8">
        <div className="hidden md:block col-span-2 w-full">
          <MenuItems className="" />
        </div>
        <div className="col-span-6 flex flex-col md:flex-row justify-center w-full">
          <div>
            <Image
              src={"/images/home/banner1.png"}
              alt="banner image"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div>
            <Image
              src={"/images/home/banner2.png"}
              alt="banner image"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingBannerWithMenuItems;
