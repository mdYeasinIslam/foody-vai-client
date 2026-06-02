import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const BaseLoader: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-8 border-(--primary-color-800)"/>
    </div>
  );
};

export default BaseLoader;
