"use client";
import BaseAntForm from "@/src/@base/components/BaseAntForm";
import { Form, Input, Select } from "antd";
import React, { useState } from "react";

interface IArea {
  value: string;
  label: string;
}
interface IDistrict {
  value: string;
  label: string;
  areas: IArea[];
}
export interface IDeliveryAddressFormValues {
  district: string;
  area: string;
  contactName: string;
  phone: string;
  addressName: string;
  address: string;
}

interface IProps {
  formType?: "create" | "update";
  initialValues?: Partial<IDeliveryAddressFormValues>;
  isLoading: boolean;
  onSubmit: (values: IDeliveryAddressFormValues) => void;
  onChangeValues?: (values: Partial<IDeliveryAddressFormValues>) => void;
}

// ── static data ────────────────────────────────────────────────────────────
const districts: IDistrict[] = [
  {
    value: "dhaka",
    label: "Dhaka",
    areas: [
      { value: "uttara", label: "Uttara" },
      { value: "mirpur", label: "Mirpur" },
      { value: "gulshan", label: "Gulshan" },
      { value: "dhanmondi", label: "Dhanmondi" },
      { value: "motijheel", label: "Motijheel" },
    ],
  },
  {
    value: "chittagong",
    label: "Chittagong",
    areas: [
      { value: "agrabad", label: "Agrabad" },
      { value: "nasirabad", label: "Nasirabad" },
      { value: "halishahar", label: "Halishahar" },
    ],
  },
  {
    value: "sylhet",
    label: "Sylhet",
    areas: [
      { value: "zindabazar", label: "Zindabazar" },
      { value: "ambarkhana", label: "Ambarkhana" },
    ],
  },
  {
    value: "rajshahi",
    label: "Rajshahi",
    areas: [
      { value: "shaheb-bazar", label: "Shaheb Bazar" },
      { value: "uposhahar", label: "Uposhahar" },
    ],
  },
];

// ── form field content ─────────────────────────────────────────────────────
const DeliveryAddressFields: React.FC<{
  selectedDistrict: string | null;
  onDistrictChange: (value: string) => void;
}> = ({ selectedDistrict, onDistrictChange }) => {
  const currentAreas =
    districts.find((d) => d.value === selectedDistrict)?.areas ?? [];

  return (
    <>
      {/* Row 1: District + Area */}
      <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
        <Form.Item<IDeliveryAddressFormValues>
          label="District"
          name="district"
          rules={[{ required: true, message: "Please select a district" }]}
        >
          <Select
            showSearch
            placeholder="Type or select district"
            onChange={onDistrictChange}
            optionFilterProp="label"
            options={districts.map((d) => ({ value: d.value, label: d.label }))}
          />
        </Form.Item>

        <Form.Item<IDeliveryAddressFormValues>
          label="Area"
          name="area"
          rules={[{ required: true, message: "Please select an area" }]}
        >
          <Select
            placeholder={
              selectedDistrict ? "Select area" : "Select district first"
            }
            disabled={!selectedDistrict}
            options={currentAreas}
          />
        </Form.Item>
      </div>

      {/* Row 2: Contact Name + Phone */}
      <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
        <Form.Item<IDeliveryAddressFormValues>
          label="Contact Name"
          name="contactName"
          rules={[{ required: true, message: "Please enter contact name" }]}
        >
          <Input placeholder="Enter contact person name" />
        </Form.Item>

        <Form.Item<IDeliveryAddressFormValues>
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter phone number" },
            {
              pattern: /^01[3-9]\d{8}$/,
              message: "Enter a valid BD number (e.g. 01XXXXXXXXX)",
            },
          ]}
        >
          <Input placeholder="01XXXXXXXXX" maxLength={11} />
        </Form.Item>
      </div>

      {/* Row 3: Address Name */}
      <Form.Item<IDeliveryAddressFormValues>
        label="Address Name"
        name="addressName"
        rules={[{ required: true, message: "Please enter address name" }]}
      >
        <Input placeholder="i.e. Home, Office" />
      </Form.Item>

      {/* Row 4: Address */}
      <Form.Item<IDeliveryAddressFormValues>
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please enter full address" }]}
      >
        <Input.TextArea
          placeholder="i.e. House 12, Road 3, Block E, Uttara"
          rows={4}
        />
      </Form.Item>
    </>
  );
};

// ── main component ─────────────────────────────────────────────────────────
const AddDeliveryAddressForm: React.FC<IProps> = ({
  formType = "create",
  initialValues,
  isLoading,
  onSubmit,
  onChangeValues,
}) => {
  const [form] = Form.useForm<IDeliveryAddressFormValues>();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
    initialValues?.district ?? null,
  );

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    form.setFieldValue("area", undefined);
  };

  return (
    <BaseAntForm<IDeliveryAddressFormValues>
      formInstance={form}
      formType={formType}
      initialValues={initialValues}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onChangeValues={onChangeValues}
      steps={[
        {
          label: "Delivery Address",
          content: (
            <DeliveryAddressFields
              selectedDistrict={selectedDistrict}
              onDistrictChange={handleDistrictChange}
            />
          ),
        },
      ]}
    />
  );
};

export default AddDeliveryAddressForm;
