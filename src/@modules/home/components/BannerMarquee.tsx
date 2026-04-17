import cn from "@/src/@libs/utils/_cn";
import Image from "next/image";
import React from "react";
import { ClassNameValue } from "tailwind-merge";

// marquee data
export const MarqueeData = [
  { title: "image1", img: "/images/home/bannerMarque1.png" },
  { title: "image2", img: "/images/home/bannerMarque2.png" },
  { title: "image3", img: "/images/home/bannerMarque3.png" },
  { title: "image4", img: "/images/home/bannerMarque4.png" },
];
interface IProps {
  className?: ClassNameValue;
}
const BannerMarquee: React.FC<IProps> = ({ className }) => {
  const doubledComponents = MarqueeData ? [...MarqueeData, ...MarqueeData] : [];

  return (
    <div
      className={cn(
        className,
        "slider-container w-full flex-nowrap relative overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]",
      )}
    >
      <div className="marqueeSliderLeft flex items-center gap-5">
        {doubledComponents.map((item, index) => {
          return (
            <Image
              key={index}
              src={item.img}
              alt="banner image"
              width={300}
              height={200}
              className="w-full h-auto"
            />
          );
        })}
      </div>
    </div>
  );
};
// <p
//   className="py-2 px-6 dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium whitespace-nowrap"
//   key={index}
// >
//   {item.title}
// </p>
export default BannerMarquee;
