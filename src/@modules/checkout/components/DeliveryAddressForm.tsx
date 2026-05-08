import BaseLoader from "@/src/@base/components/BaseLoader";
import BaseModal from "@/src/@base/components/BaseModal";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { useAreas, useCountries } from "../libs/hooks";

const DeliveryAddressForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [districtId, setDistrictId] = useState<number | null>(null);
  const { data, isLoading, isPending } = useCountries();
  const {data: areaData} = useAreas(districtId || 1)
  const districtsData = data?.data;
  const areasData = areaData?.data;
  // console.log(districtsData);
  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    setIsModalOpen(false);
    form.resetFields();
  };

  if (isModalOpen && (isLoading || isPending)) {
    return <BaseLoader className="left-3/4 top-2" />;
  }
  return (
    <>
      <div className="border border-(--primary-color-500) rounded-lg ">
        <div className="flex justify-between items-center bg-(--primary-color-600) px-4 py-2 ">
          <h3 className="text-base font-semibold ">Delivery address</h3>
          <button
            onClick={handleAddNew}
            className=" text-sm font-semibold cursor-pointer"
          >
            + Add new
          </button>
        </div>
        <p className="text-gray-500  px-4 py-2">No address found.</p>
      </div>
      {/* 
      <Modal
        title="Add New Address"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
       
      </Modal> */}
      <BaseModal
        title="Add New Address"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="District"
              name="district"
              rules={[{ required: true, message: "Please select district" }]}
            >
              <Select
                placeholder="Type or select district"
                options={districtsData?.map((district) => ({
                  label: district.name,
                  value: district.id,
                }))}
                onChange={(e) => setDistrictId(e)}
              />
            </Form.Item>

            <Form.Item
              label="Area"
              name="area"
              rules={[{ required: true, message: "Please select area" }]}
            >
              <Select
                placeholder="Select district first"
                options={districtsData?.map((district) => ({
                  label: district.name,
                  value: district.id,
                }))}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Contact Name"
              name="contactName"
              rules={[{ required: true, message: "Please enter contact name" }]}
            >
              <Input placeholder="Enter contact person name" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>
          </div>

          <Form.Item
            label="Address Name"
            name="addressName"
            rules={[{ required: true, message: "Please enter address name" }]}
          >
            <Input placeholder="i.e. Home, Office" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input.TextArea
              placeholder="i.e. House 12, Road 3, Block E, Uttara"
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-(--primary-color-800)! font-semibold! py-5!"
            >
              Add Address
            </Button>
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
};

export default DeliveryAddressForm;
