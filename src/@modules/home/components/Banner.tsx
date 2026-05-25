import cn from "@/src/@libs/utils/_cn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const Banner: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        "md:container mx-auto relative w-full overflow-hidden",
      )}
    >
      <div className="absolute inset-0  flex flex-col gap-1 md:gap-3 justify-center p-4 sm:p-6 md:p-8 lg:p-12 max-w-xs md:max-w-full z-10">
        <p className="text-xs sm:text-sm text-gray-600">Best Deals</p>
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
          Limited Time  <span className="text-(--primary-color-800) uppercase">Offer</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-700">
          Get up to 50% off on selected items.
        </p>
        <Link href={"/products"}>
          <button className="btn-primary max-sm:py-0.5! md:max-lg:py-1! max-sm:px-1 max-sm:text-xs">View Deals</button>
        </Link>
      </div>
      <>
        <Image
          src={"/images/home/b.png"}
          alt="banner image"
          width={1480}
          height={300}
          priority
          className="hidden md:block w-full h-auto object-cover"
        />
        <Image
          src={"/images/home/bs.png"}
          alt="banner image"
          width={1480}
          height={300}
          priority
          className="h-auto md:hidden"
        />
      </>
    </div>
  );
};

export default Banner;
