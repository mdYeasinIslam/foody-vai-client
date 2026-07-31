// src/pages/admin/components/AddCategoryModal.tsx
import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ICategoryCreateAndUpdate } from "@/src/@modules/categories/libs/interfaces";
import BaseImageUpload from "@/src/@base/components/BaseImageUpload";
import BaseModal from "@/src/@base/components/BaseModal";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ICategoryCreateAndUpdate) => void;
  isSubmitting: boolean;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (values: ICategoryCreateAndUpdate) => {
    try {
      await onSubmit({
        ...values,
        img: imageUrl || "",
      });
      form.resetFields();
      setImageUrl(null);
      onClose();
    } catch (error) {
      message.error("Failed to add category");
    }
  };

  const handleImageUpload = (info: any) => {
    console.log(info);
    if (info.file.status === "done") {
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <BaseModal
      title="Add New Category"
      open={isOpen}
      onCancel={onClose}
      destroyOnHidden={true}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter category description" />
        </Form.Item>

        <Form.Item label="Category Image">
          <Upload
            name="img"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleImageUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Category Image">
          <BaseImageUpload
            value={form?.getFieldValue("img")}
            onChange={(url) => form?.setFieldValue("img", url)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="w-full"
          >
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </BaseModal>
  );
};

export default AddCategoryModal;
