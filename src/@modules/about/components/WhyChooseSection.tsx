import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const WhyChooseSection: React.FC<IProps> = ({ className }) => {
  return (
    <section
      className={cn(className, "bg-[#E9F5EE] py-16 ")}
    >
      <div className="container">
        <h2 className="text-3xl font-bold text-[#014725] mb-10">
          Why Choose FoodyVai?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh & Organic",
              desc: "Sourced directly from trusted local farmers",
            },
            {
              title: "Fast Delivery",
              desc: "Quick and reliable delivery to your location",
            },
            {
              title: "Best Prices",
              desc: "Competitive pricing without compromising quality",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#0e9b3b] mb-3">
                {item.title}
              </h3>
              <p className="text-[#62595D]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
