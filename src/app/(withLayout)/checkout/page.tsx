import React from 'react'

const CheckoutPage:React.FC = () => {
  return (
      <section>
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Delivery Address */}
                    <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Delivery address</h3>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">+ Add new</button>
                        </div>
                        <p className="text-gray-500">No address found.</p>
                    </div>

                    {/* Coupon Section */}
                    <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Coupon and Others</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input type="text" placeholder="Have a coupon code?" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Apply</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5" />
                                    <span className="text-gray-700">Points</span>
                                </label>
                                <span className="text-green-600 text-sm font-medium">Available: 0</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Date */}
                    <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Date</h3>
                        <input type="text" value="Thu, Apr 23, 2026" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" readOnly />
                    </div>

                    {/* Special Notes */}
                    <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Special notes (optional)</h3>
                        <textarea placeholder="Add any additional delivery instructions" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"></textarea>
                    </div>
                </div>

                {/* Right Section - Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border border-gray-200 rounded-lg p-6 bg-white sticky top-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h3>
                        
                        {/* Products */}
                        <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">Katari Rice (Boiled) - 5 kg</p>
                                    <p className="text-gray-500 text-sm">(Quantity: 2)</p>
                                </div>
                                <p className="text-gray-800 font-medium">৳ 950</p>
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">Mustard Oil - 500 ml</p>
                                    <p className="text-gray-500 text-sm">(Quantity: 2)</p>
                                </div>
                                <p className="text-gray-800 font-medium">৳ 338</p>
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">Katari Rice (Boiled) - 25 kg</p>
                                    <p className="text-gray-500 text-sm">(Quantity: 1)</p>
                                </div>
                                <p className="text-gray-800 font-medium">৳ 2,328</p>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span className="font-medium">৳ 3,616</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Delivery Charge</span>
                                <span className="font-medium">৳ 0</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Order Discount</span>
                                <span className="font-medium">৳ 0</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t border-gray-200">
                                <span>Total Payable</span>
                                <span>৳ 3,616</span>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-3 mb-6">
                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="radio" name="payment" className="w-5 h-5" />
                                <span className="text-gray-700 font-medium">Cash on delivery</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 border-2 border-green-500 rounded-lg cursor-pointer bg-green-50">
                                <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-green-600" />
                                <span className="text-gray-700 font-medium">Pay Online</span>
                            </label>
                            <p className="text-gray-600 text-sm">Please check the Delivery Policy before completing your order.</p>
                        </div>

                        {/* Order Button */}
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
                            Order Now
                        </button>

                        {/* Terms */}
                        <p className="text-gray-600 text-xs mt-4">
                            By placing your order, you agree to be bound by the Khaas Food <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy</a>. Your credit/debit card data will not be saved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CheckoutPage