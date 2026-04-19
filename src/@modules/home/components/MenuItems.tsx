"use client";

import cn from "@/src/@libs/utils/_cn";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaBowlRice } from "react-icons/fa6";
import {
  GiChickenOven,
  GiHoneyJar
} from "react-icons/gi";
import { TiThSmallOutline } from "react-icons/ti";
import { ClassNameValue } from "tailwind-merge";

type MenuItem = Required<MenuProps>["items"][number];

interface IProps {
  className?: ClassNameValue;
}

type MenuData = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: { key: string; label: string }[];
};

const menuData: MenuData[] = [
  {
    key: "all-products",
    label: "All Products",
    icon: <TiThSmallOutline />,
  },
  {
    key: "rice-pulse-grains",
    label: "Rice, Pulse & Grains",
    icon: <FaBowlRice />,
    children: [
      { key: "rice", label: "Rice" },
      { key: "pulse", label: "Pulse" },
      { key: "grains", label: "Grains" },
    ],
  },
  {
    key: "poultry-meat",
    label: "Poultry & Meat",
    icon: <GiChickenOven />,
    children: [
      { key: "poultry", label: "Poultry" },
      { key: "meat", label: "Meat" },
    ],
  },
  {
    key: "honey",
    label: "Honey",
    icon: <GiHoneyJar />,
    children: [
      { key: "raw-honey", label: "Raw Honey" },
      { key: "organic-honey", label: "Organic Honey" },
    ],
  },
];
const MenuItems: React.FC<IProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();

  //  Build items dynamically (IMPORTANT)
  const items: MenuItem[] = menuData.map((item) => ({
    key: item.key,

    //  Parent clickable
    label: (
      <div
        onClick={(e) => {
          e.stopPropagation(); // prevent submenu toggle
          router.push(`/product-category/${item.key}`);
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        {item.icon}
        <span>{item.label}</span>
      </div>
    ),

    //  Children
    children: item.children?.map((child) => ({
      key: `${item.key}/${child.key}`, // IMPORTANT: full path key
      label: child.label,
    })),
  }));

  //  Extract selected key from URL
  const pathParts = pathname.split("/").filter(Boolean);

  let selectedKey = "";
  let openKey = "";

  if (pathParts[0] === "product-category") {
    if (pathParts.length === 2) {
      // parent route
      selectedKey = pathParts[1];
      openKey = pathParts[1];
    }

    if (pathParts.length === 3) {
      // child route
      openKey = pathParts[1];
      selectedKey = `${pathParts[1]}/${pathParts[2]}`;
    }
  }

  const onClick: MenuProps["onClick"] = (e) => {
    //  Child click only
    router.push(`/product-category/${e.key}`);
  };

  return (
    <Menu
      mode="vertical"
      items={items}
      onClick={onClick}
      selectedKeys={[selectedKey]}
      defaultOpenKeys={[openKey]}
      className={cn(className)}
      style={{ fontSize: 16 }}
    />
  );
};

export default MenuItems;
// "use client";
// import cn from "@/src/@libs/utils/_cn";
// import type { MenuProps } from "antd";
// import { Menu } from "antd";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { FaBowlRice, FaJarWheat, FaWineBottle } from "react-icons/fa6";
// import {
//   GiChickenOven,
//   GiCoconuts,
//   GiCoolSpices,
//   GiFishEggs,
//   GiHoneyJar,
//   GiMilkCarton,
// } from "react-icons/gi";
// import { PiBowlSteamDuotone } from "react-icons/pi";
// import { SiFoodpanda } from "react-icons/si";
// import { TiThSmallOutline } from "react-icons/ti";
// import { ClassNameValue } from "tailwind-merge";

// type MenuItem = Required<MenuProps>["items"][number];
// interface IProps {
//   className?: ClassNameValue;
// }

// const labelDefine = (
//   label: string,
//   icon?: React.ReactNode,
//   key?: string,
//   router?: any,
// ) => {
//   return (
//     <div
//       onClick={(e) => {
//         e.stopPropagation(); // prevent submenu toggle
//         if (key) {
//           router.push(`/product-category/${key}`);
//         }
//       }}
//       className="flex items-center gap-2 cursor-pointer"
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// };
// const items: MenuItem[] = [
//   {
//     key: "all-products",
//     label: labelDefine(
//       "All Products",
//       <TiThSmallOutline className="w-6 h-auto" />,
//       "all-products",
//       router
//     ),
//   },
//   {
//     key: "rice-pulse-grains",
//     label: labelDefine(
//       "Rice, Pulse & Grains",
//       <FaBowlRice className="w-6 h-auto" />,
//       "rice-pulse-grains",
//     ),
//     children: [
//       { key: "rice", label: "Rice" },
//       { key: "pulse", label: "Pulse" },
//       { key: "grains", label: "Grains" },
//     ],
//   },
//   {
//     key: "poultry-meat",
//     label: labelDefine(
//       "Poultry & Meat",
//       <GiChickenOven className="w-6 h-auto" />,
//       "poultry-meat",
//     ),
//     children: [
//       { key: "poultry", label: "Poultry" },
//       { key: "meat", label: "Meat" },
//     ],
//   },
//   {
//     key: "honey",
//     label: labelDefine("Honey", <GiHoneyJar className="w-6 h-auto" />, "honey"),
//     children: [
//       { key: "raw-honey", label: "Raw Honey" },
//       { key: "organic-honey", label: "Organic Honey" },
//     ],
//   },
//   {
//     key: "oil",
//     label: labelDefine("Oil", <FaWineBottle className="w-6 h-auto" />, "oil"),
//     children: [
//       { key: "coconut-oil", label: "Coconut Oil" },
//       { key: "olive-oil", label: "Olive Oil" },
//     ],
//   },
//   {
//     key: "spices",
//     label: labelDefine("Spices", <GiCoolSpices className="w-6 h-auto" />, "spices"),
//     children: [
//       { key: "turmeric", label: "Turmeric" },
//       { key: "cumin", label: "Cumin" },
//     ],
//   },
//   {
//     key: "super-foods",
//     label: labelDefine("Super Foods", <SiFoodpanda className="w-6 h-auto" />, "super-foods"),
//     children: [
//       { key: "quinoa", label: "Quinoa" },
//       { key: "chia-seeds", label: "Chia Seeds" },
//     ],
//   },
//   {
//     key: "tea-snacks-drinks",
//     label: labelDefine(
//       "Tea, Snacks & Drinks",
//       <PiBowlSteamDuotone className="w-6 h-auto" />,
//       "tea-snacks-drinks",
//     ),
//     children: [
//       { key: "tea", label: "Tea" },
//       { key: "snacks", label: "Snacks" },
//       { key: "drinks", label: "Drinks" },
//     ],
//   },
//   {
//     key: "sweeteners-dairy",
//     label: labelDefine(
//       "Sweeteners & Dairy",
//       <GiMilkCarton className="w-6 h-auto" />,
//       "sweeteners-dairy",
//     ),
//     children: [
//       { key: "honey-sweetener", label: "Honey" },
//       { key: "milk", label: "Milk" },
//     ],
//   },
//   {
//     key: "fish",
//     label: labelDefine("Fish", <GiFishEggs className="w-6 h-auto" />, "fish"),
//     children: [
//       { key: "fresh-fish", label: "Fresh Fish" },
//       { key: "dried-fish", label: "Dried Fish" },
//     ],
//   },
//   {
//     key: "pickles-chutney",
//     label: labelDefine(
//       "Pickles & Chutney",
//       <FaJarWheat className="w-6 h-auto" />,
//       "pickles-chutney",
//     ),
//     children: [
//       { key: "pickles", label: "Pickles" },
//       { key: "chutney", label: "Chutney" },
//     ],
//   },
//   {
//     key: "nuts-dates",
//     label: labelDefine("Nuts & Dates", <GiCoconuts className="w-6 h-auto" />, "nuts-dates"),
//     children: [
//       { key: "nuts", label: "Nuts" },
//       { key: "dates", label: "Dates" },
//     ],
//   },
// ];

// const findParentKey = (itemKey: string): string | null => {
//   console.log(itemKey)
//   for (const item of items) {
//     if (item?.key == "all-products") {
//       return null
//     }
//       if (item?.key === itemKey) {
//         return item.key as string; // Item itself, no parent
//       }
//     if (item && "children" in item && item.children) {
//       const child = item.children.find((c: any) => c.key === itemKey);
//       if (child) {
//         return item.key as string;
//       }
//     }
//   }
//   return null;
// };

// const MenuItems: React.FC<IProps> = ({ className }) => {
//   const router = useRouter();
//   const onClick: MenuProps["onClick"] = (e) => {
//     console.log("click", e);
//     const parentKey = findParentKey(e.key);

//     if (parentKey) {
//       // Child item clicked
//       router.push(`/product-category/${parentKey}/${e.key}`);
//     } else {
//       // Parent item clicked
//       router.push(`/product-category/${e.key}`);
//     }
//   };
//   return(
//   <Menu
//     onClick={onClick}
//     style={{
//       fontSize: 16,
//     }}
//     mode="vertical"
//     items={items}
//     className={cn(className)}
//   />
// );}

// export default MenuItems;
