import MenuItems from "@/src/@modules/home/MenuItems";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <div className="hidden md:block">
        <MenuItems />
      </div>
    </React.Fragment>
  );
};

export default page;
