"use client";
import BaseLoader from "@/src/@base/components/BaseLoader";
import cn from "@/src/@libs/utils/_cn";
import { useGetAllOrders } from "@/src/@modules/order/libs/hooks";
import React, { useEffect } from "react";
import { ClassNameValue } from "tailwind-merge";

interface IProps {
  className?: ClassNameValue;
}
const OrderPage: React.FC<IProps> = ({ className }) => {
  const { mutateAsync, isPending } = useGetAllOrders();
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await mutateAsync();

        console.log(res.data); // array of orders
      } catch (err) {
        console.error(err);
      }
    };

    loadOrders();
  }, []);
  if (isPending) return <BaseLoader />;
  return <div className={cn(className, "")}>OrderPage</div>;
};

export default OrderPage;
