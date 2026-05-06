"use client";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import { calculateTotal } from "@/src/@libs/utils/helperFunction";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ClassNameValue } from "tailwind-merge";
import { ICartItem } from "../../cart/libs/interfaces";
import { Delivery_Charge } from "../libs/enums";
import DeliveryAddressForm from "./DeliveryAddressForm";
import Link from "next/link";
interface IProps {
  className?: ClassNameValue;
}
const CheckoutPage: React.FC<IProps> = () => {
  const [showCoupon, setShowCoupon] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const [cart] = useGlobalState<ICartItem[]>({
    key: "cart",
    initialValue: [],
  });
  console.log(paymentMethod);
  const subTotal = calculateTotal(cart);
  const deliveryCharge = Delivery_Charge.INSIDE_DHAKA;
  const isDiscount = false;
  const calculateDiscount = isDiscount ? 10 : 0;
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <DeliveryAddressForm />

            {/* Coupon Section */}
            <div className="border border-(--primary-color-500) rounded-lg ">
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
                    <button className="bg-(--primary-color-800) hover:bg-(--primary-color-900) text-white max-sm:text-xs px-2 py-1 md:px-6 md:py-2 rounded-lg font-medium cursor-pointer">
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

            {/* Delivery Date */}
            <div className="border border-(--primary-color-500) rounded-lg ">
              <div className="bg-(--primary-color-600) px-4 py-2">
                <h3 className="text-base font-semibold">Delivery Date</h3>
              </div>
              {/* <input
                type="text"
                value="Thu, Apr 23, 2026"
                className="w-full px-4 py-2 border border-(--primary-color-500) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-color-600)"
                readOnly
              /> */}
              <DatePicker
                size={"large"}
                placement="bottomLeft"
                className="w-full border-(--primary-color-600)!"
                suffixIcon={null}
                defaultPickerValue={dayjs()}
              />
            </div>

            {/* Special Notes */}
            <div className="border border-(--primary-color-500) rounded-lg ">
              <div className="bg-(--primary-color-600) px-4 py-2">
                <h3 className="text-base font-semibold">Special Notes</h3>
              </div>
              <div className="p-4">
                <textarea
                  placeholder="Add any additional delivery instructions"
                  rows={5}
                  className="w-full px-4 py-2 border border-(--primary-color-500) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-color-800) resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="md:border border-(--primary-color-500) rounded-lg md:p-6 bg-white sticky top-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h3>

              {/* Products */}
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-2 hidden_scrollbar">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Cart is empty
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-gray-200"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-200 rounded shrink-0">
                          {item.img && (
                            <Image
                              src={item.img}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">
                            {item.name} -
                            <span className="text-gray-500">
                              {item.weight} kg
                            </span>
                          </h3>
                          <p className="text-xs text-gray-500">
                            (Quantity- {item.quantity})
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <p className="">৳ {item.price}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="space-y-4 my-6">
                {[
                  { label: "Subtotal", value: subTotal },
                  { label: "Delivery Charge", value: deliveryCharge },
                  { label: "Order Discount", value: -calculateDiscount },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex  text-sm justify-between font-medium border-b border-(--primary-color-500)"
                  >
                    <span>{label}</span>
                    <span>৳ {value}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-3">
                  <span>Total Payable</span>
                  <span>৳ {subTotal + deliveryCharge - calculateDiscount}</span>
                </div>
              </div>

              {/* Payment Methods */}

              <div className="space-y-3 mb-6">
                {["cod", "online"].map((method) => (
                  <div key={method}>
                    <label className="flex flex-col  gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 has-checked:border-(--primary-color-800)  hover:border-(--primary-color-800) transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 accent-green-600"
                        />
                        <span className="text-gray-700 font-medium">
                          {method === "cod" ? (
                            "Cash on delivery"
                          ) : (
                            <span>
                              Pay Online
                              <span className="uppercase text-xs pl-3 text-gray-400">
                                Verified by
                              </span>
                              <span className="bg-blue-900 text-white italic  text-xs ml-1 px-1 rounded">
                                SSLCommerz
                              </span>
                            </span>
                          )}
                        </span>
                      </div>
                      {paymentMethod === method && (
                        <p className="text-xs text-gray-600 bg-(--primary-color-500)  ml-8 p-2 rounded-lg">
                          {method == "cod"
                            ? " Please complete payment after you get your products and check the Delivery Policy before completing your  order."
                            : "Please check the Delivery Policy before completing your order."}
                        </p>
                      )}
                    </label>
                  </div>
                ))}
              </div>

              {/* Order Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
                Order Now
              </button>

              {/* Terms */}
              <p className="text-gray-600 text-xs mt-4">
                By placing your order, you agree to be bound by the Khaas Food
                <Link
                  href="/terms-and-services"
                  className="text-green-600 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-green-600 hover:underline"
                >
                  Privacy
                </Link>
                . Your credit/debit card data will not be saved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
