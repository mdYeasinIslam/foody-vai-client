import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const MissionSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn(className, "py-16")}>
      <div className="container">
        <h2 className="text-3xl font-bold text-[#014725] mb-6">Our Mission</h2>
        <p className="text-lg text-[#62595D] leading-relaxed mb-6">
          At FoodyVai, we believe everyone deserves access to fresh,
          high-quality food. Our mission is to bridge the gap between local
          farmers and food lovers by providing a seamless e-commerce platform
          that delivers farm-to-table goodness.
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
