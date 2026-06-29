"use client";

import cn from "@/src/@libs/utils/_cn";
import { useAuthState } from "@/src/@modules/auth/libs/hooks/useAuthState";
import CartContent from "@/src/@modules/cart/components/CartContent";
import CartDrawer from "@/src/@modules/cart/components/CartDrawer";
import { useCartState } from "@/src/@modules/cart/libs/hooks/useCartState";
import MenuItems from "@/src/@modules/home/components/MenuItems";
import {
  DownOutlined,

  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, MenuProps, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { ClassNameValue } from "tailwind-merge";

interface IProps {
  className?: ClassNameValue;
}

const accountItems: MenuProps["items"] = [
  { key: "profile", label: "My Profile" },
  { key: "orders", label: "My Orders" },
  { key: "settings", label: "Settings" },
  { type: "divider" },
  { key: "logout", label: "Logout" },
];

const LandingHeaderCopy: React.FC<IProps> = ({ className }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { cart, cartProductsFromDB, setCart, clearCart } =
    useCartState(messageApi);
  const { user, clearAuthUser } = useAuthState(messageApi);
  
  // Sync guest cart to database whenever a user logs in
  useEffect(() => {
    if (user && user.email && cartProductsFromDB) {
      setCart(cartProductsFromDB);
    }
  }, [user, cartProductsFromDB]);

  const handleAfterNavigateFn = () => {
    setOpenMenu(false);
  };
  const handleOnCloseAfterCheckoutFn = () => {
    setOpen(false);
  };

  const handleLogoutFn = ({ key }: { key: string }) => {
    if (key === "logout") {
      clearAuthUser();
      // setCart([]);
      router.push("/signIn");
    }
  };
  return (
    <nav className={cn(className, "relative w-full bg-green-700 shadow-md")}>
      {contextHolder}
      <div className="container flex items-center justify-between gap-2  h-16 md:h-20  ">
        {/* Logo */}
        <div className="flex items-center gap-1 shrink-0 cursor-pointer">
          <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden  text-white"
          >
            {openMenu ? (
              <RxCross2 className="w-7 h-7" />
            ) : (
              <IoMenu className="w-7 h-7" />
            )}
          </button>
          {openMenu && (
            <div
              className={cn(
                "lg:hidden absolute left-0 top-16 md:top-20 transition-all duration-1000 ease-in z-50",
                {
                  "-left-80 ": !openMenu,
                },
              )}
            >
              <MenuItems
                handleAfterNavigate={handleAfterNavigateFn}
                className="md:w-[50vw]"
              />
            </div>
          )}

          <Link
            href="/"
            className="flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <figure className="flex items-center justify-center">
              <Image
                src={"/images/auth/logo.png"}
                alt="Login Illustration"
                width={40}
                height={40}
                className="max-sm:w-8 max-sm:h-8 w-full h-full object-cover rounded-lg shadow-md"
              />
            </figure>
            {/* <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm select-none">
              🍛

            </div> */}
            <span className="hidden sm:block font-extrabold text-xl text-white tracking-tight leading-none">
              Foody<span className="text-(--primary-color-500)">Vai</span>
            </span>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <div className="hidden md:block w-px h-7 bg-white/20 mx-1" />
          {user && user.email ? (
            <Dropdown
              menu={{
                items: accountItems,
                onClick: handleLogoutFn,
              }}
              trigger={["click"]}
            >
              <button
                type="button"
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-1 py-1 mg:px-3 md:py-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-yellow-300 flex items-center justify-center text-green-800 font-bold text-sm select-none">
                  Y
                </div>
                <span className="hidden md:block text-sm font-semibold">
                  Account
                </span>
                <DownOutlined style={{ fontSize: 10 }} />
              </button>
            </Dropdown>
          ) : (
            <Link href="/signIn" className="btn-primary btn-nav">
              Sign In
            </Link>
          )}

          <Badge count={cart?.length} size="small" offset={[-2, 2]}>
            <span
              onClick={() => setOpen(true)}
              className="p-1 md:p-2.5 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ShoppingCartOutlined style={{ fontSize: 18 }} />
            </span>
          </Badge>
        </div>
      </div>

      {open && (
        <CartDrawer
          title={
            <h1 className="text-xl font-semibold">
              Shopping Cart : {cart?.length} Item{" "}
            </h1>
          }
          open={open}
          onClose={handleOnCloseAfterCheckoutFn}
          handleClearCart={() => {
            clearCart();
          }}
          content={
            <>
              <CartContent
                handleOnCloseAfterCheckoutFn={handleOnCloseAfterCheckoutFn}
              />
            </>
          }
        />
      )}
    </nav>
  );
};

export default LandingHeaderCopy;
