"use client";

import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { ICategory } from "@/src/@modules/categories/libs/interfaces";

interface Props {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
}

export default function CategoryTable({ categories, onEdit, onDelete }: Props) {
  return (
    <>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories?.map((category) => (
            <tr key={category._id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">
                <Image
                  src={category?.img}
                  alt={category.name}
                  width={60}
                  height={60}
                  className="rounded-xl object-cover"
                />
              </td>

              <td className="px-6 py-4">
                <div className="font-semibold">{category.name}</div>
              </td>

              <td className="px-6 py-4">
                <div className="text-xs text-gray-500 line-clamp-2">
                  {category.description}
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 cursor-pointer"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(category)}
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

      {categories.length === 0 && (
        <div className="py-20 text-center text-gray-400">
          No Categories Found
        </div>
      )}
    </>
  );
}
