"use client";

import cn from "@/src/@libs/utils/_cn";
import MenuItems from "@/src/@modules/home/MenuItems";
import {
  BellOutlined,
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Input, MenuProps } from "antd";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { ClassNameValue } from "tailwind-merge";

interface IProps {
  className?: ClassNameValue;
}

// const cityItems: MenuProps["items"] = [
//   { key: "dhaka", label: "Dhaka" },
//   { key: "chittagong", label: "Chittagong" },
//   { key: "sylhet", label: "Sylhet" },
//   { key: "rajshahi", label: "Rajshahi" },
// ];

const accountItems: MenuProps["items"] = [
  { key: "profile", label: "My Profile" },
  { key: "orders", label: "My Orders" },
  { key: "settings", label: "Settings" },
  { type: "divider" },
  { key: "logout", label: "Logout" },
];

const LandingHeader: React.FC<IProps> = () => {
  //   const [selectedCity, setSelectedCity] = useState("Dhaka");
  const [searchValue, setSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const cartCount = 3;
  const notifCount = 2;

  return (
    <nav className="relative w-full bg-green-700 shadow-md">
      <div className="container flex items-center justify-between gap-2  h-16 md:h-20  ">
        {/* Logo */}
        <div className="flex items-center gap-1 shrink-0 cursor-pointer">
          <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden  text-white"
          >
            {!openMenu ? (
              <RxCross2 className="w-7 h-7" />
            ) : (
              <IoMenu className="w-7 h-7" />
            )}
          </button>
          {!openMenu && (
            <div
              className={cn("lg:hidden absolute left-0 top-16 md:top-20", {
                openMenu: "",
              })}
            >
              <MenuItems className="md:w-[50vw]" />
            </div>
          )}

          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm select-none">
            🍛
          </div>
          <span className="hidden sm:block font-extrabold text-xl text-white tracking-tight leading-none">
            Foody<span className="text-yellow-300">Vai</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs xl:max-w-xl">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for biriyani, pizza, burgers..."
            prefix={<SearchOutlined className="text-white/70" />}
            //   suffix={
            //     <Dropdown
            //       menu={{
            //         items: cityItems,
            //         onClick: ({ key }) => {
            //           const city = cityItems?.find(
            //             (i) => i && "key" in i && i.key === key,
            //           );
            //           if (city && "label" in city)
            //             setSelectedCity(city.label as string);
            //         },
            //       }}
            //       trigger={["click"]}
            //     >
            //       <button
            //         type="button"
            //         className="flex items-center gap-1 text-white/85 text-sm font-semibold border-l border-white/30 pl-3 ml-1 hover:text-white transition-colors"
            //       >
            //         {selectedCity}
            //         <DownOutlined style={{ fontSize: 10 }} />
            //       </button>
            //     </Dropdown>
            //   }
            className="rounded-full border-white/30 bg-white/15 text-white placeholder-white/60 hover:border-white/50 focus-within:border-white/60 md:py-2!"
            //   style={{
            //     backgroundColor: "rgba(255,255,255,0.15)",
            //     borderColor: "rgba(255,255,255,0.3)",
            //     color: "#fff",
            //   }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <Badge
            count={notifCount}
            size="small"
            offset={[-2, 2]}
            className="hidden! md:block!"
          >
            <button
              type="button"
              className="md:p-2.5 p-1.5 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <BellOutlined style={{ fontSize: 18 }} />
            </button>
          </Badge>

          <div className="hidden md:block w-px h-7 bg-white/20 mx-1" />

          <Dropdown menu={{ items: accountItems }} trigger={["click"]}>
            <button
              type="button"
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-1 py-1 mg:px-3 md:py-1.5 text-white hover:bg-white/20 transition-colors"
            >
              <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-yellow-300 flex items-center justify-center text-green-800 font-bold text-sm select-none">
                Y
              </div>
              <span className="hidden md:block text-sm font-semibold">
                Account
              </span>
              <DownOutlined style={{ fontSize: 10 }} />
            </button>
          </Dropdown>

          <Badge count={cartCount} size="small" offset={[-2, 2]}>
            <button
              type="button"
              className="p-1 md:p-2.5 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <ShoppingCartOutlined style={{ fontSize: 18 }} />
            </button>
          </Badge>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;
