import { Button, Form, FormInstance } from "antd";
import React from "react";
import BaseButton from "./BaseButton";

type BaseFormProps<T = any> = {
  form: FormInstance;
  initialValues?: Partial<T>;
  loading?: boolean;
  submitText?: string;
  onFinish: (values: T) => void;
  children: React.ReactNode;
};

const BaseForm = <T = any,>({
  form,
  initialValues,
  loading,
  submitText = "Submit",
  onFinish,
  children,
}: BaseFormProps<T>) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      {children}

      <Form.Item>
        {/* <Button htmlType="submit" type="primary" loading={loading} block>
          {submitText}
        </Button> */}
        <BaseButton content={submitText} />
      </Form.Item>
    </Form>
  );
};

export default BaseForm;
