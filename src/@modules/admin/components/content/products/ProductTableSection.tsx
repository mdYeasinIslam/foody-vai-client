"use client";
import { IProduct } from "@/src/@modules/products/libs/interfaces";
import Image from "next/image";
import { FaPenAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface IProps {
  products: IProduct[];
  setProductModal: (product: IProduct) => void;
  setDeleteTarget: (product: IProduct) => void;
}

const ProductTableSection: React.FC<IProps> = ({
  products,
  setProductModal,
  setDeleteTarget,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            <th className="px-6 py-4">Product</th>

            <th className="px-6 py-4">Category</th>

            <th className="px-6 py-4">Variants</th>

            <th className="px-6 py-4">Price Range</th>

            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const prices = product.prices.map((p) => p.price);

            const minPrice = Math.min(...prices);

            const maxPrice = Math.max(...prices);

            return (
              <tr
                key={product._id}
                className="border-b last:border-none hover:bg-orange-50/40 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={55}
                      height={55}
                      className="rounded-xl object-cover border"
                    />

                    <div>
                      <h4 className="font-semibold text-[#1e2a3a]">
                        {product.name}
                      </h4>

                      <p className="text-xs text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                    {product.category}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {product.prices.map((item) => (
                      <div key={item.weight} className="text-sm flex gap-2">
                        <span className="font-medium">{item.weightName}</span>

                        <span className="text-gray-500">৳{item.price}</span>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-semibold text-[#f97316]">
                    ৳{minPrice}
                    {minPrice !== maxPrice && ` - ৳${maxPrice}`}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setProductModal(product)}
                      className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                    >
                      <FaPenAlt className="mx-auto" />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                    >
                      <MdDelete className="mx-auto" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ProductTableSection;
