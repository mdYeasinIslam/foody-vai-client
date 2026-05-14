"use client";
import BaseLoader from "@/src/@base/components/BaseLoader";
import { useProducts } from "../libs/hooks";
import ProductCopy from "./ProductCopy";

const AllProducts = () => {
  const { data, isLoading, error } = useProducts({});
  const productData = data?.data;
  console.log(productData)
  // const { mutate: createMutate, isPending: isPendingInCreateTime } =
  //   useCreateCartProduct({
  //     config: {
  //       onSuccess: async (data) => {
  //         if (!data?.alreadyExist && data?.success) {
  //           setCart((prev) => [...prev, data?.data]);
  //           messageApi.success("Product added to the cart successfully");
  //           return;
  //         } else if (data?.alreadyExist && data?.success) {
  //           setCart((prev) =>
  //             prev.map((item) =>
  //               item.productId === product._id &&
  //               item.price?.weight === selectedWeight
  //                 ? { ...item, quantity: item.quantity + 1 }
  //                 : item,
  //             ),
  //           );
  //           messageApi.success(data?.message || "Product quantity updated");
  //         } else {
  //           messageApi.error(
  //             data?.message || "Failed to add product to the cart",
  //           );
  //         }
  //       },
  //     },
  //   });
  // const { mutate: updateMutate, isPending: isPendingInUpdateTime } =
  //   useUpdateCartProduct({
  //     config: {
  //       onSuccess: (data) => {
  //         if (data?.success && !data?.deleted) {
  //           setCart((prev) =>
  //             prev.map((item) =>
  //               item.productId === product._id &&
  //               item.price?.weight === selectedWeight
  //                 ? { ...item, quantity: data.data.quantity }
  //                 : item,
  //             ),
  //           );
  //           messageApi.success(data?.message || "Quantity updated");
  //         } else if (data?.deleted) {
  //           setCart((prev) =>
  //             prev.filter((item) => item?._id !== data.cartItemId),
  //           );
  //           messageApi.success(data?.message || "Product removed from cart");
  //         } else {
  //           messageApi.error(data?.message || "Failed to update quantity");
  //         }
  //       },
  //     },
  //   });
  if (isLoading) {
    return <BaseLoader className='relative top-10 left-1/2'/>
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
            <ProductCopy
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
