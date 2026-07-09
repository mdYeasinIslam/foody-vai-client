"use client";

import React from "react";
import { Form, Modal } from "antd";
import BaseAntForm from "@/src/@base/components/BaseAntForm";
import {
  IProduct,
  IProductCreateAndUpdate,
} from "@/src/@modules/products/libs/interfaces";
import BaseImageUpload from "@/src/@base/components/BaseImageUpload";

interface Props {
  open: boolean;
  product: IProduct | "add" | null;
  categories: string[];

  isLoading: boolean;

  createProduct: (payload: IProductCreateAndUpdate) => void;
  onSave: (values: IProductCreateAndUpdate, id?: string) => void;

  onClose: () => void;
}

const EMPTY_VALUES: IProductCreateAndUpdate = {
  _id: "",
  name: "",
  description: "",
  category: "",
  subcategory: "",
  quantity: 0,
  img: "",
  prices: [
    {
      weight: 250,
      weightName: "250 gm",
      price: 0,
      originalPrice: 0,
      currency: "BDT",
    },
  ],
};

export default function ProductModal({
  open,
  product,
  categories,

  createProduct,
  onSave,
  onClose,

  isLoading,
}: Props) {
  const [form] = Form.useForm<IProductCreateAndUpdate>();

  const isEdit = !!product && product !== "add";

  const initialValues: IProductCreateAndUpdate = isEdit
    ? {
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        quantity: product?.quantity,
        img: product.img,
        prices: product.prices,
      }
    : EMPTY_VALUES;

  React.useEffect(() => {
    if (!open) return;

    if (isEdit) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
      form.setFieldsValue(EMPTY_VALUES);
    }
  }, [open, product]);

  const handleSubmit = (values: IProductCreateAndUpdate) => {
    if (isEdit) {
      onSave(values, isEdit ? product._id : undefined);
    } else {
      createProduct(values);
    }

    form.resetFields();
    onClose();
  };

  // ==============================
  // PART-2
  // ProductFields will be here
  // ==============================

  const ProductFields = {
    basic: (
      <div className="space-y-5">
        <Form.Item
          label="Product Image"
          name="img"
          rules={[
            {
              required: true,
              message: "Please upload product image",
            },
          ]}
        >
          <BaseImageUpload
            value={form.getFieldValue("img")}
            onChange={(url) => form.setFieldValue("img", url)}
          />
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Product name is required",
            },
          ]}
        >
          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
            placeholder="Product Name"
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <textarea
            rows={4}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
            placeholder="Description"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Category is required",
              },
            ]}
          >
            <select className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]">
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Form.Item>

          <Form.Item label="Sub Category" name="subcategory">
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Sub Category"
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Available Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Quantity is required",
            },
          ]}
        >
          <input
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
            placeholder="Quantity"
          />
        </Form.Item>
      </div>
    ),

    variants: (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Price Variants</h2>

          <Form.List name="prices">
            {(fields, { add }) => (
              <>
                <button
                  type="button"
                  onClick={() =>
                    add({
                      weight: 250,
                      weightName: "",
                      price: 0,
                      originalPrice: 0,
                      currency: "BDT",
                    })
                  }
                  className="rounded-lg bg-[#f97316] px-4 py-2 text-white"
                >
                  + Add Variant
                </button>

                <div className="hidden" />
              </>
            )}
          </Form.List>
        </div>

        <Form.List name="prices">
          {(fields, { remove }) => (
            <div className="space-y-5">
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="rounded-2xl border border-gray-200 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-semibold">Variant #{index + 1}</h4>

                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(field.name)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <Form.Item
                      {...field}
                      label="Weight Name"
                      name={[field.name, "weightName"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <input
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                        placeholder="250 gm"
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Weight"
                      name={[field.name, "weight"]}
                    >
                      <input
                        type="number"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Price"
                      name={[field.name, "price"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <input
                        type="number"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Original Price"
                      name={[field.name, "originalPrice"]}
                    >
                      <input
                        type="number"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Currency"
                      name={[field.name, "currency"]}
                    >
                      <input className="w-full rounded-xl border border-gray-200 px-4 py-3" />
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Form.List>
      </div>
    ),
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      destroyOnClose
      title={isEdit ? "Update Product" : "Add Product"}
    >
      <BaseAntForm<IProductCreateAndUpdate>
        formInstance={form}
        formType={isEdit ? "update" : "create"}
        initialValues={initialValues}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        steps={[
          {
            label: "Product",
            content: (
              <>
                {ProductFields.basic}

                <div className="mt-8">{ProductFields.variants}</div>
              </>
            ),
          },
        ]}
      />
    </Modal>
  );
}
