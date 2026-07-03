"use client";
import BaseLoader from "@/src/@base/components/BaseLoader";
import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { useFetchAllOrders } from "../../../libs/hooks/useFetchAllOrders";
import { useOrderState } from "@/src/@modules/order/libs/hooks/useOrderState";

interface IProps {
  className?: ClassNameValue;
}
const OrderPage: React.FC<IProps> = ({ className }) => {
  // const { orders, isError, isPending } = useFetchAllOrders();
  const { orders, isPending, isError, errorMessage, refetchOrders } =
    useOrderState();
  if (isPending) return <BaseLoader />;
  if (isError)
    return <div className="text-red-500 p-6">Error: </div>;
  console.log("orders",isPending,  orders);
  return <div className={cn(className, "")}>OrderPage</div>;
};

export default OrderPage;
