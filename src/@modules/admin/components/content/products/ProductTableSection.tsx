"use client";

import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { IProduct } from "@/src/@modules/products/libs/interfaces";

interface Props {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="px-6 py-4">Image</th>

            <th className="px-6 py-4">Name</th>

            <th className="px-6 py-4">Category</th>

            <th className="px-6 py-4">Variants</th>

            <th className="px-6 py-4">Price</th>

            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-xl object-cover"
                />
              </td>

              <td className="px-6 py-4">
                <div className="font-semibold">{product.name}</div>

                <div className="text-xs text-gray-500 line-clamp-2">
                  {product.description}
                </div>
              </td>

              <td className="px-6 py-4">{product.category}</td>

              <td className="px-6 py-4">{product.prices.length}</td>

              <td className="px-6 py-4">
                ৳{Math.min(...product.prices.map((p) => p.price))}
                {product.prices.length > 1 && (
                  <span className="text-xs text-gray-500 ml-2">-</span>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 cursor-pointer"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(product)}
                    className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="py-20 text-center text-gray-400">No Products Found</div>
      )}
    </>
  );
}
