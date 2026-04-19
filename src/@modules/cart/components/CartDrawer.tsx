'use client'
import cn from '@/src/@libs/utils/_cn';
import { Drawer } from 'antd';
import React from 'react';
import { ClassNameValue } from 'tailwind-merge';
interface IProps {
  className?: ClassNameValue;
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
}
const CartDrawer: React.FC<IProps> = ({
  className,
  open,
  onClose,
  content,
}) => {
  return (
    <Drawer
      title="Drawer Closable Placement"
      closable={{ placement: "end" }}
      onClose={onClose}
      open={open}
      className={cn(className)}
    >
      {content}
    </Drawer>
  );
};

export default CartDrawer