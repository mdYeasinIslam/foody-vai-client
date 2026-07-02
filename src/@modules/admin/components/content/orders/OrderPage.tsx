import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";

interface IProps {
  className?: ClassNameValue;
}
const OrderPage: React.FC<IProps> = ({ className }) => {
  return <div className={cn(className, "")}>OrderPage</div>;
};

export default OrderPage;
