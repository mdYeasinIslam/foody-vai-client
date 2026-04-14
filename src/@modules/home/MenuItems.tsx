"use client";
import cn from "@/src/@libs/utils/_cn";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React from "react";
import { FaBowlRice, FaJarWheat, FaWineBottle } from "react-icons/fa6";
import {
  GiChickenOven,
  GiCoconuts,
  GiCoolSpices,
  GiFishEggs,
  GiHoneyJar,
  GiMilkCarton,
} from "react-icons/gi";
import { PiBowlSteamDuotone } from "react-icons/pi";
import { SiFoodpanda } from "react-icons/si";
import { TiThSmallOutline } from "react-icons/ti";
import { ClassNameValue } from "tailwind-merge";

type MenuItem = Required<MenuProps>["items"][number];
interface IProps {
  className?: ClassNameValue;
}
const labelDefine = (icon: React.ReactNode, label: string) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>{label}</div>
    </div>
  );
};
const items: MenuItem[] = [
  {
    key: "all-products",
    label: labelDefine(
      <TiThSmallOutline className="w-6 h-auto" />,
      "All Products",
    ),
  },
  {
    key: "rice-pulse-grains",
    label: labelDefine(
      <FaBowlRice className="w-6 h-auto" />,
      "Rice, Pulse & Grains",
    ),
    children: [
      { key: "rice", label: "Rice" },
      { key: "pulse", label: "Pulse" },
      { key: "grains", label: "Grains" },
    ],
  },
  {
    key: "poultry-meat",
    label: labelDefine(
      <GiChickenOven className="w-6 h-auto" />,
      "Poultry & Meat",
    ),
    children: [
      { key: "poultry", label: "Poultry" },
      { key: "meat", label: "Meat" },
    ],
  },
  {
    key: "honey",
    label: labelDefine(<GiHoneyJar className="w-6 h-auto" />, "Honey"),
    children: [
      { key: "raw-honey", label: "Raw Honey" },
      { key: "organic-honey", label: "Organic Honey" },
    ],
  },
  {
    key: "oil",
    label: labelDefine(<FaWineBottle className="w-6 h-auto" />, "Oil"),
    children: [
      { key: "coconut-oil", label: "Coconut Oil" },
      { key: "olive-oil", label: "Olive Oil" },
    ],
  },
  {
    key: "spices",
    label: labelDefine(<GiCoolSpices className="w-6 h-auto" />, "Spices"),
    children: [
      { key: "turmeric", label: "Turmeric" },
      { key: "cumin", label: "Cumin" },
    ],
  },
  {
    key: "super-foods",
    label: labelDefine(<SiFoodpanda className="w-6 h-auto" />, "Super Foods"),
    children: [
      { key: "quinoa", label: "Quinoa" },
      { key: "chia-seeds", label: "Chia Seeds" },
    ],
  },
  {
    key: "tea-snacks-drinks",
    label: labelDefine(
      <PiBowlSteamDuotone className="w-6 h-auto" />,
      "Tea, Snacks & Drinks",
    ),
    children: [
      { key: "tea", label: "Tea" },
      { key: "snacks", label: "Snacks" },
      { key: "drinks", label: "Drinks" },
    ],
  },
  {
    key: "sweeteners-dairy",
    label: labelDefine(
      <GiMilkCarton className="w-6 h-auto" />,
      "Sweeteners & Dairy",
    ),
    children: [
      { key: "honey-sweetener", label: "Honey" },
      { key: "milk", label: "Milk" },
    ],
  },
  {
    key: "fish",
    label: labelDefine(<GiFishEggs className="w-6 h-auto" />, "Fish"),
    children: [
      { key: "fresh-fish", label: "Fresh Fish" },
      { key: "dried-fish", label: "Dried Fish" },
    ],
  },
  {
    key: "pickles-chutney",
    label: labelDefine(
      <FaJarWheat className="w-6 h-auto" />,
      "Pickles & Chutney",
    ),
    children: [
      { key: "pickles", label: "Pickles" },
      { key: "chutney", label: "Chutney" },
    ],
  },
  {
    key: "nuts-dates",
    label: labelDefine(<GiCoconuts className="w-6 h-auto" />, "Nuts & Dates"),
    children: [
      { key: "nuts", label: "Nuts" },
      { key: "dates", label: "Dates" },
    ],
  },
];

const onClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const MenuItems: React.FC<IProps> = ({className}) => (
  <Menu
    onClick={onClick}
    style={{
      fontSize: 16,
    }}
    mode="vertical"
    items={items}
    className={cn(className)}
  />
);

export default MenuItems;
