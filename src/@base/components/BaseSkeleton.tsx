import cn from "@/src/@libs/utils/_cn";
import { Skeleton } from "antd";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
  rowNumber?: number;
  isAvatar?: boolean;
}
const BaseSkeleton: React.FC<IProps> = ({ className, rowNumber, isAvatar }) => {
  return (
    <>
      <Skeleton
        avatar={isAvatar ? true : false}
        paragraph={{ rows: rowNumber ? rowNumber : 1 }}
        className={cn(className, "mt-1")}
      />
    </>
  );
};

export default BaseSkeleton;
