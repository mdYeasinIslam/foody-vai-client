"use client";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import { useProducts } from "../libs/hooks";
import Product from "./Product";
import ProductCopy from "./ProductCopy";
import { ICartItemCreate } from "../../cart/libs/interfaces";

const AllProducts = () => {
  const { data, isLoading, error } = useProducts({});
  const productData = data?.data;
const [cart, setCart] = useGlobalState<ICartItemCreate[]>({
  key: "cart",
  initialValue: [],
});
    console.log(cart);
  
  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">All Products</h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">All Products</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>Failed to load products. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!productData || productData?.length === 0) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">All Products</h2>
        <div className="text-center text-gray-500">
          <p>No products available</p>
        </div>
      </section>
    );
  }
  return (
    <section className="">
      <div className="container">
        <h2 className="text-2xl font-bold mt-8">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {productData?.map((product) => (
            <ProductCopy key={product._id} product={product} cart={cart} setCart={setCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
