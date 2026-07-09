import React from "react";
import { ClassNameValue } from "tailwind-merge";
import PageHeader from "../base/PageHeader";
interface IProps {
  className?: ClassNameValue;
}

const ProductsPage: React.FC<IProps> = () => {
  return (
    <div className="space-y-6 px-8 pt-5">
      <PageHeader
        pageTitle="ORDERS"
        // refresh={refresh} stats={stats}
          />
          
    </div>
  );
};

export default ProductsPage;
