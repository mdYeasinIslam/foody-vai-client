"use client";
import cn from "@/src/@libs/utils/_cn";
import { Drawer } from "antd";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  title?: React.ReactNode;
  handleClearCart: () => void;
}
const CartDrawer: React.FC<IProps> = ({
  className,
  open,
  onClose,
  content,
  title,
  handleClearCart
}) => {
 
  return (
    <Drawer
      title={title}
      closable={{ placement: "end" }}
      onClose={onClose}
      open={open}
      placement="right"
      extra={
        <>
          <button
            onClick={handleClearCart}
            className="text-gray-400 hover:text-red-600 transition cursor-pointer"
          >
            <FiTrash2 size={20} className="mt-0.5" />
          </button>
        </>
      }
      size={500}
      className={cn(className)}
    >
      {content}
    </Drawer>
  );
};

export default CartDrawer;
