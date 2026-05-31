import cn from "@/src/@libs/utils/_cn";
import { Skeleton } from "antd";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const BaseSkeleton: React.FC<IProps> = ({ className }) => {
  return (
    <>
      <Skeleton
        avatar
        paragraph={{ rows: 1 }}
        className={cn(className, "mt-1")}
      />
    </>
  );
};

export default BaseSkeleton;
