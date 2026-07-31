"use client";

import BaseAntForm from "@/src/@base/components/BaseAntForm";
import BaseImageUpload from "@/src/@base/components/BaseImageUpload";
import BaseModal from "@/src/@base/components/BaseModal";
import {
  IProduct,
  IProductCreateAndUpdate,
} from "@/src/@modules/products/libs/interfaces";
import { Col, Form, Row } from "antd";
import React from "react";

interface Props {
  open: boolean;
  product: IProduct | "add" | null;
  categories: string[];

  isLoading: boolean;

  // createProduct: (payload: IProductCreateAndUpdate) => void;
  onSave: (values: IProductCreateAndUpdate, id?: string) => void;

  onClose: () => void;
}

const EMPTY_VALUES: IProductCreateAndUpdate = {
  _id: "",
  name: "",
  description: "",
  img: "",
  sellUnit: "",
  price: 0,
  salePrice: 0,
  averageRating: 0,
  category: "",
  quantity: 0,
  slug: "",
};

export default function ProductModal({
  open,
  product,
  categories,
  onSave,
  onClose,

  isLoading,
}: Props) {
  const [form] = Form.useForm<IProductCreateAndUpdate>();

  const isEdit = !!product && product !== "add";

  const initialValues = React.useMemo<IProductCreateAndUpdate>(
    () =>
      isEdit
        ? {
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            img: product?.img,
            sellUnit: product.sellUnit,
            price: product.price,
            salePrice: product.salePrice,
            averageRating: product.averageRating,
            quantity: product.quantity,
            slug: product.slug,
          }
        : EMPTY_VALUES,
    [isEdit, product],
  );

  React.useEffect(() => {
    if (!open) return;

    if (isEdit) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
      form.setFieldsValue(EMPTY_VALUES);
    }
  }, [open, product, form, initialValues, isEdit]);

  const handleSubmit = (values: IProductCreateAndUpdate) => {
    onSave(values, isEdit ? product._id : undefined);

    form.resetFields();
    onClose();
  };

  // ==============================
  // PART-2
  // ProductFields will be here
  // ==============================

  const ProductFields = {
    basic: (
      <Row gutter={10}>
        <Col xs={24}>
          <Form.Item
            className="my-0!"
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
              value={form?.getFieldValue("img")}
              onChange={(url) => form?.setFieldValue("img", url)}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            className="my-0!"
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
        </Col>
        <Col xs={24} md={12}>
          <Form.Item className="my-0!" label="Description" name="description">
            <textarea
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Description"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            className="my-0!"
            label="Sell Unit"
            name="sellUnit"
            rules={[
              {
                required: true,
                message: "Sell unit is required",
              },
            ]}
          >
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Sell Unit"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            className="my-0!"
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price is required",
              },
            ]}
          >
            <input
              type="number"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Price"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item className="my-0!" label="Sale Price" name="salePrice">
            <input
              type="number"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Sale Price"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            className="my-0!"
            label="Average Rating"
            name="averageRating"
          >
            <input
              type="number"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Average Rating"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            className="my-0!"
            label="Quantity"
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
        </Col>
        <Col xs={24} md={12}>
          <Form.Item className="my-0!" label="Slug" name="slug">
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Slug"
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Row gutter={10}>
            <Col xs={24} md={12}>
              <Form.Item
                className="my-0!"
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
            </Col>

            <Col xs={24} md={12}>
              <Form.Item className="my-0!" label="Sub Category" name="slug">
                <input type="hidden" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form.Item
            className="my-0!"
            label="Available Weight"
            name="availableWeight"
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
              placeholder="Available Weight or quantity"
            />
          </Form.Item>
        </Col> */}
      </Row>
    ),

    variants: (
      <div className="space-y-2">
        {/* <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Price Variants</h2>

          <Form.List name="prices">
            {(_, { add }) => (
              <>
                <button
                  type="button"
                  onClick={() =>
                    add({
                      weight: 0,
                      weightName: "",
                      price: 0,
                      originalPrice: 0,
                      currency: "BDT",
                      availableWeight: 0,
                    })
                  }
                  className="rounded-lg bg-[#f97316] px-4 py-2 text-white cursor-pointer"
                >
                  + Add Variant
                </button>

                <div className="hidden" />
              </>
            )}
          </Form.List>
        </div> */}

        {/* <Form.List name="prices">
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

                  <Row gutter={[16, 2]} about="">
                    <Col sm={24} md={12}>
                      <Form.Item
                        className="my-0!"
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
                    </Col>
                    <Col sm={24} md={12}>
                      <Form.Item
                        className="my-0!"
                        {...field}
                        label="Weight"
                        name={[field.name, "weight"]}
                      >
                        <input
                          type="number"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={12}>
                      <Form.Item
                        className="my-0!"
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
                    </Col>
                    <Col sm={24} md={12}>
                      <Form.Item
                        className="my-0!"
                        {...field}
                        label="Original Price"
                        name={[field.name, "originalPrice"]}
                      >
                        <input
                          type="number"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={12}>
                      <Form.Item
                        className="my-0!"
                        {...field}
                        label="Currency Name"
                        name={[field.name, "currency"]}
                      >
                        <input className="w-full rounded-xl border border-gray-200 px-4 py-3" />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={12}>
                      <Form.Item
                        className="my-0!"
                        {...field}
                        label="Available Weight"
                        name={[field.name, "availableWeight"]}
                      >
                        <input className="w-full rounded-xl border border-gray-200 px-4 py-3" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          )}
        </Form.List> */}
      </div>
    ),
  };
  return (
    <BaseModal
      open={open}
      onCancel={onClose}
      width={900}
      height={700}
      destroyOnHidden={true}
      title={isEdit ? "Update Product" : "Add Product"}
      className="overflow-y-scroll max-h-[80vh] h-full px-5 py-8 my-0!"
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
    </BaseModal>
  );
}
