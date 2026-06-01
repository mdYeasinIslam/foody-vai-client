import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { ICustomerAddress } from "../libs/interfaces";
import cn from "@/src/@libs/utils/_cn";
interface IProps {
  className?: ClassNameValue;
  address: ICustomerAddress;
}
const ShowAddress: React.FC<IProps> = ({ address, className }) => {
  return (
    <div className={cn(className, "")}>
      <div className="flex items-center gap-3">
        <h1 className="font-semibold">{address.contactName}</h1>
        <p>{address.phone}</p>
      </div>
      <p>
        {address.address} <span>{address.areaName}</span>
        <span>{address.districtName}</span>
      </p>
    </div>
  );
};

export default ShowAddress;
