import cn from "@/src/@libs/utils/_cn";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const CouponSection: React.FC<IProps> = ({ className }) => {
  const [showCoupon, setShowCoupon] = useState(true);
  return (
    <div
      className={cn(
        className,
        "border border-(--primary-color-500) rounded-lg",
      )}
    >
      <div className="flex justify-between items-center bg-(--primary-color-600) px-4 py-2">
        <h3 className="text-base font-semibold ">Coupon and Others</h3>
        <div>
          <button
            onClick={() => setShowCoupon(!showCoupon)}
            className="flex items-center gap-1 text-sm font-semibold cursor-pointer"
          >
            <span>{showCoupon ? "Hide" : "Show"}</span>
            {showCoupon ? (
              <IoIosArrowUp className="w-4 h-4" />
            ) : (
              <IoIosArrowDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      {showCoupon && (
        <div className="space-y-4 p-2 lg:p-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Have a coupon code?"
              className="flex-1 px-4 py-1 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-color-800)"
            />
            <button className="bg-(--primary-color-700) hover:bg-(--primary-color-800) text-white max-sm:text-xs px-2 py-1 md:px-6 md:py-2 rounded-lg font-medium cursor-pointer">
              Apply
            </button>
          </div>
          {/* <div className="flex items-center justify-between  px-4 py-1">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5" />
                        <span className="text-gray-700">Points</span>
                      </label>
                      <span className="text-green-600 text-sm font-medium">
                        Available: 0
                      </span>
                    </div> */}
        </div>
      )}
    </div>
  );
};

export default CouponSection;
