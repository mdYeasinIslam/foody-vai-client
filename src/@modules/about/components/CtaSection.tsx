import cn from "@/src/@libs/utils/_cn";
import Link from "next/link";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const CtaSection: React.FC<IProps> = ({ className }) => {
  return (
    <section
      className={cn(
        className,
        "bg-[#0e9b3b] py-16 text-center",
      )}
    >
      <div className="container">
     
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Experience Fresh?
        </h2>
        <p className="text-[#E5F2E9] mb-8">
          Join thousands of satisfied customers
        </p>
        <button className="btn-primary bg-white text-[#0e9b3b] hover:bg-[#E5F2E9] px-8 py-3 rounded-lg font-semibold transition">
          <Link href={"/products"}>Start Shopping Now</Link>
        </button>
      </div>
    </section>
  );
};

export default CtaSection;
