"use client";
import { PathName } from "@/src/@libs/constant/_paths";
import cn from "@/src/@libs/utils/_cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
  bannerImg?: string;
  title?: string;
}
const BaseComponentHeroBanner: React.FC<IProps> = ({
  className,
  bannerImg,
  title,
}) => {
  const path = usePathname().split("/")?.pop()?.split("-")?.join(" ");
  return (
    <div
      className={cn(className, "w-full h-40 lg:h-60", {
        "bg-(--primary-color-900)": !bannerImg,
      })}
      style={{
        backgroundImage: bannerImg && `url(${bannerImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full flex flex-col items-center justify-center  text-white text-center  ">
        <h1 className="text-2xl md:text-4xl font-bold  mb-2 capitalize">
          {title ? title : path}
        </h1>
        <p className="flex items-center gap-2 text-xs md:text-base">
          <Link
            href={PathName.root}
            className="flex items-center gap-1 text-gray-300 hover:underline hover:text-white "
          >
            <FaHome />
            Home
          </Link>
          <FaAngleLeft /> <span className="capitalize">{path}</span>
        </p>
      </div>
    </div>
  );
};

export default BaseComponentHeroBanner;
