"use client";


import BaseAntForm from "@/src/@base/components/BaseAntForm";
import BaseImageUpload from "@/src/@base/components/BaseImageUpload";
import BaseModal from "@/src/@base/components/BaseModal";
import { ICategory, ICategoryCreateAndUpdate } from "@/src/@modules/categories/libs/interfaces";
import { Col, Form, Row } from "antd";
import React from "react";

interface Props {
  open: boolean;
  category: ICategory | "add" | null;
  isLoading: boolean;
  onSave: (values: ICategoryCreateAndUpdate, id?: string) => void;
  onClose: () => void;
}

const EMPTY_VALUES: ICategoryCreateAndUpdate = {
  _id: "",
  name: "",
  description: "",
  img: "",
};

export default function CategoryModal({
  open,
  category,
  onSave,
  onClose,
  isLoading,
}: Props) {
  const [form] = Form.useForm<ICategoryCreateAndUpdate>();

  const isEdit = !!category && category !== "add";

  const initialValues = React.useMemo<ICategoryCreateAndUpdate>(
    () =>
      isEdit
        ? {
            _id: category?._id,
            name: category.name,
            description: category?.description,
            img: category?.img,
          }
        : EMPTY_VALUES,
    [isEdit, category]
  );

  React.useEffect(() => {
    if (!open) return;

    if (isEdit) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
      form.setFieldsValue(EMPTY_VALUES);
    }
  }, [open, category, form, initialValues, isEdit]);

  const handleSubmit = (values: ICategoryCreateAndUpdate) => {
    onSave(values, isEdit ? category._id : undefined);
    form.resetFields();
    onClose();
  };

  const CategoryFields = {
    basic: (
      <Row gutter={10}>
        <Col xs={24}>
          <Form.Item
            className="my-0!"
            label="Category Image"
            name="img"
            rules={[
              {
                required: true,
                message: "Please upload category image",
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
            label="Category Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Category name is required",
              },
            ]}
          >
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Category Name"
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            className="my-0!"
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <textarea
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#f97316]"
              placeholder="Description"
            />
          </Form.Item>
        </Col>
      </Row>
    ),
  };

  return (
    <BaseModal
      open={open}
      onCancel={onClose}
      width={700}
      height={500}
      destroyOnHidden={true}
      title={isEdit ? "Update Category" : "Add Category"}
      className="overflow-y-scroll max-h-[80vh] h-full px-5 py-8 my-0!"
    >
      <BaseAntForm<ICategoryCreateAndUpdate>
        formInstance={form}
        formType={isEdit ? "update" : "create"}
        initialValues={initialValues}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        steps={[
          {
            label: "Category Details",
            content: CategoryFields.basic,
          },
        ]}
      />
    </BaseModal>
  );
}
