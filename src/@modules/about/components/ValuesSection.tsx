import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const ValuesSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn(className, "py-16")}>
      <div className="container">
        <h2 className="text-3xl font-bold text-[#014725] mb-6">Our Values</h2>
        <ul className="space-y-4 text-[#62595D]">
          <li className="flex items-start">
            <span className="text-[#0e9b3b] font-bold mr-3">✓</span>
            <span>
              <strong>Quality First:</strong> Every product is carefully
              selected and inspected
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#0e9b3b] font-bold mr-3">✓</span>
            <span>
              <strong>Sustainability:</strong> We support eco-friendly farming
              practices
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#0e9b3b] font-bold mr-3">✓</span>
            <span>
              <strong>Community:</strong> Supporting local farmers and
              communities
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ValuesSection;
