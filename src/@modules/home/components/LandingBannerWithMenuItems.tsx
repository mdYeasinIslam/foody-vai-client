import React from "react";
import Banner from "./Banner";

interface IProps {
  className?: string;
}
const LandingBannerWithMenuItems: React.FC<IProps> = () => {
  return (
    <section>
      <div className="">
        {/* <NavbarMenuItemsOptional /> */}
        {/* <div className=" grid lg:grid-cols-8 ">
          <aside className="hidden lg:block col-span-2 w-full">
            <MenuItems className="h-100 2xl:h-116 overflow-y-scroll hidden_scrollbar" />
          </aside>
          <aside className="col-span-6 flex-1 w-full">
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
            <>
              <BannerMarquee className="flex-1 mt-auto" />
            </>
          </aside>
        </div> */}
        <Banner />
      </div>
    </section>
  );
};

export default LandingBannerWithMenuItems;
