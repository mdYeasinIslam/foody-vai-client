import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";

interface IProps {
  className?: ClassNameValue;
}

const ShopSmarterSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn(className, "bg-white   text-white")}>
      <div className="max-w-4xl mx-auto  rounded-3xl bg-green-700 px-12 py-16">
        <h1 className="text-4xl font-bold mb-4">
          Shop Smarter with the FoodyVai App
        </h1>

        <p className="text-green-100 mb-2">
          Track orders live, get exclusive app-only deals, and reorder your
          favorites in one tap.
        </p>
        <p className="text-green-100 mb-8">Available on Android & iOS.</p>

        <button className="border border-green-100 text-white px-6 py-2 rounded-lg mb-6 hover:bg-green-600 transition">
          Download Free
        </button>

        <div className="flex gap-4">
          <button className="border border-green-100 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition">
            <span>🎮</span> Google Play
          </button>
          <button className="border border-green-100 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition">
            <span>🍎</span> App Store
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopSmarterSection;
