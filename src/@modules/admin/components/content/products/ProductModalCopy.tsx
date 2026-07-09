// "use client";

// import BaseImageUpload from "@/src/@base/components/BaseImageUpload";
// import { IProduct, IProductCreateAndUpdate } from "@/src/@modules/products/libs/interfaces";
// import { useState } from "react";


// interface IProps {
//   product: IProduct | "add" | null;
//   categories: string[];
//   onSave: (values: IProductCreateAndUpdate, id?: string) => void;
//   onClose: () => void;
// }

// const EMPTY_FORM: IProductCreateAndUpdate = {
//   _id: "",
//   name: "",
//   description: "",
//   category: "",
//   subcategory: "",
//   quantity: 0,
//   img: "",
//   prices: {
//     weight: 250,
//     price: 0,
//     originalPrice: 0,
//     weightName: "250 gm",
//     currency: "৳",
//   },
// };

// export default function ProductModalCopy({
//   product,
//   categories,
//   onSave,
//   onClose,
// }: IProps) {
//   const isEdit = !!product && product !== "add";

//   const [form, setForm] = useState<IProductCreateAndUpdate>(
//     isEdit
//       ? {
//           _id: product._id,
//           name: product.name,
//           description: product.description || "",
//           category: product.category,
//           subcategory: product.subcategory || "",
//           quantity: 0,
//           img: product.img,
//           prices: {
//             weight: product.prices[0]?.weight || 250,
//             price: product.prices[0]?.price || 0,
//             originalPrice: product.prices[0]?.originalPrice || 0,
//             weightName: product.prices[0]?.weightName || "",
//             currency: product.prices[0]?.currency || "৳",
//           },
//         }
//       : EMPTY_FORM,
//   );

//   const [errors, setErrors] = useState<any>({});

//   const setValue = (key: keyof IProductCreateAndUpdate, value: any) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: value,
//     }));

//     setErrors((prev: any) => ({
//       ...prev,
//       [key]: "",
//     }));
//   };

//   const setPrice = (key: keyof IProductCreateAndUpdate["prices"], value: any) => {
//     setForm((prev) => ({
//       ...prev,
//       price: {
//         ...prev.prices,
//         [key]: value,
//       },
//     }));
//   };

//   const validate = () => {
//     const e: any = {};

//     if (!form.name.trim()) e.name = "Product name required";

//     if (!form.category) e.category = "Category required";

//     if (!form.prices.price) e.price = "Price required";

//     return e;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const err = validate();

//     if (Object.keys(err).length) {
//       setErrors(err);
//       return;
//     }

//     onSave(form, isEdit ? product._id : undefined);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center border-b px-6 py-5">
//           <h2 className="font-bold text-xl">
//             {isEdit ? "Edit Product" : "Add Product"}
//           </h2>

//           <button onClick={onClose} className="text-2xl">
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           <BaseImageUpload
//             value={form?.img}
//             onChange={(url) => setValue("img", url)}
//           />

//           <input
//             value={form.name}
//             onChange={(e) => setValue("name", e.target.value)}
//             placeholder="Product Name"
//             className="w-full border rounded-xl p-3"
//           />

//           <textarea
//             value={form.description || ""}
//             onChange={(e) => setValue("description", e.target.value)}
//             placeholder="Description"
//             className="w-full border rounded-xl p-3 h-24"
//           />

//           <select
//             value={form.category}
//             onChange={(e) => setValue("category", e.target.value)}
//             className="w-full border rounded-xl p-3"
//           >
//             {categories.map((item) => (
//               <option key={item}>{item}</option>
//             ))}
//           </select>

//           <input
//             value={form.subcategory}
//             onChange={(e) => setValue("subcategory", e.target.value)}
//             placeholder="Sub Category"
//             className="w-full border rounded-xl p-3"
//           />

//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="number"
//               value={form?.prices?.weight}
//               onChange={(e) => setPrice("weight", Number(e.target.value))}
//               placeholder="Weight"
//               className="border rounded-xl p-3"
//             />

//             <input
//               value={form?.prices?.weightName}
//               onChange={(e) => setPrice("weightName", e.target.value)}
//               placeholder="250 gm"
//               className="border rounded-xl p-3"
//             />

//             <input
//               type="number"
//               value={form?.prices?.price}
//               onChange={(e) => setPrice("price", Number(e.target.value))}
//               placeholder="Price"
//               className="border rounded-xl p-3"
//             />

//             <input
//               type="number"
//               value={form?.prices?.originalPrice}
//               onChange={(e) =>
//                 setPrice("originalPrice", Number(e.target.value))
//               }
//               placeholder="Original Price"
//               className="border rounded-xl p-3"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="border px-5 py-3 rounded-xl"
//             >
//               Cancel
//             </button>

//             <button  className="bg-[#f97316] text-white px-5 py-3 rounded-xl">
//               {isEdit ? "Update Product" : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
