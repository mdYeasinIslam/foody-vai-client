"use client";
import cn from "@/src/@libs/utils/_cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
const navItems = [
  { label: "Offers", link: "/offers" },
  { label: "Products", link: "/products" },
  { label: "Blog", link: "/blog" },
  { label: "Contact", link: "/contact" },
  { label: "About", link: "/about" },
];
const NavbarMenuItemsOptional = () => {
  const pathname = usePathname();

  return (
    <section className="relative border-b border-(--primary-color-800)">
      <div className="container md:grid lg:grid-cols-8 ">
        <div className="col-span-2 hidden lg:flex items-center gap-4 py-2.5 ">
          <IoMenu className="w-6 h-auto xl:w-7 xl:h-7" />
          <p className="font-semibold text-base xl:text-lg uppercase">
            Visit Food Bazar
          </p>
        </div>
        <div className="hidden_scrollbar w-full lg:col-span-6 flex md:justify-around lg:flex-wrap max-md:gap-2 max-md:overflow-x-scroll scroll-smooth ">
          {navItems?.map((item, index) => {
            const isActive = pathname.includes(item.link);
            console.log(isActive, item.label);
            return (
              <div
                key={index}
                className={cn(
                  "max-md:bg-(--secondary-color-500) max-md:text-(--secondary-color-700) max-md:rounded-full px-4 py-1.5 md:px-2.5 xl:px-4 md:py-2.5 max-md:my-1",
                  index < 7 && "max-sm:border-r border-(--primary-color-800)",
                  index === 0 && "hidden",
                )}
              >
                <Link
                  href={item.link}
                  className={cn(
                    "hover:text-(--primary-color-800) text-sm xl:text-lg font-semibold",
                    "transition-colors duration-200",
                    {
                      "text-(--primary-color-800)":
                        isActive,
                    },
                  )}
                >
                  {item.label}
                </Link>
                {/* {index < 7 && (
                  <div className="lg:h-10 xl:h-10 w-px bg-gray-300"></div>
                )} */}
              </div>
            );
          })}
        </div>
        <hr className="hidden md:block text-gray-300" />
      </div>
    </section>
  );
};

export default NavbarMenuItemsOptional;
