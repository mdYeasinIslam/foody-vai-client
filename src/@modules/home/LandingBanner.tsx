import React from "react";
import MenuItems from "./MenuItems";

interface IProps {
  className?: string;
}
const LandingBanner: React.FC<IProps> = () => {
  return (
    <section>
      <div className="container mx-auto grid grid-cols-8">
        <div className="hidden md:block col-span-2 w-full">
          <MenuItems className=''/>
        </div>
        <div className="col-span-6">banner image</div>
      </div>
    </section>
  );
};

export default LandingBanner;
