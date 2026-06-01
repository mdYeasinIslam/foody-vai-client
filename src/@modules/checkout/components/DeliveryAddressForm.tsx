import BaseModal from "@/src/@base/components/BaseModal";
import BaseSkeleton from "@/src/@base/components/BaseSkeleton";
import { Button, Form, Input, message, Select } from "antd";
import { useState } from "react";
import { useAddressState } from "../libs/hook/useAddressState";
import { useDistrictAndArea } from "../libs/hook/useDistrictAndArea";
import ShowAddress from "./ShowAddress";

const DeliveryAddressForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [districtId, setDistrictId] = useState<number | null>(null);
  const { districtsData, areasData, isLoading, isPending } =
    useDistrictAndArea(districtId);
  const { addressData, addressDataLoading, createCustomerAddress } =
    useAddressState(messageApi);

  console.log(addressData);
  const defaultAddress = addressData?.filter(
    (address) => address.isDefault === true,
  );
  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleSubmit = (values: any) => {
    try {
      const district = districtsData?.find((d) => d.id === values.districtId);

      const area = areasData?.find((a) => a.id === values.areaId);
      console.log(district, area);
      const payload = {
        ...values,
        districtName: district?.name,
        areaName: area?.name,
      };
      createCustomerAddress(payload);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
      messageApi.error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };
  return (
    <>
      {contextHolder}
      <div className="border border-(--primary-color-500) rounded-lg ">
        <div className="flex justify-between items-center bg-(--primary-color-600) px-4 py-2 ">
          <h3 className="text-base font-semibold ">Delivery address</h3>
          <button
            onClick={handleAddNew}
            className=" text-sm font-semibold cursor-pointer border border-transparent hover:border-(--primary-color-800) rounded-sm px-2"
          >
            + Add new
          </button>
        </div>
        {addressDataLoading && <BaseSkeleton />}
        {addressData && addressData?.length <= 0 && (
          <>
            <p className="text-gray-500  px-4 py-2">No address found.</p>
          </>
        )}
        <div>
          {defaultAddress &&
            defaultAddress?.length > 0 &&
            defaultAddress?.map((address, idx) => (
              <ShowAddress key={idx} address={address} className=" px-4 py-2" />
            ))}
        </div>
      </div>
      <BaseModal
        title="Add New Address"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="District"
              name="districtId"
              rules={[{ required: true, message: "Please select district" }]}
            >
              <Select
                placeholder="Type or select district"
                options={districtsData?.map((district) => ({
                  label: district?.name,
                  value: district.id,
                }))}
                onChange={(e) => setDistrictId(e)}
                loading={isLoading && isPending}
              />
            </Form.Item>

            <Form.Item
              label="Area"
              name="areaId"
              rules={[{ required: true, message: "Please select area" }]}
            >
              <Select
                placeholder="Select area first"
                options={
                  districtId
                    ? areasData?.map((area) => ({
                        label: area.name,
                        value: area.id,
                      }))
                    : []
                }
                disabled={!districtId}
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
            rules={[{ required: true, message: "Please select address name" }]}
          >
            <Select
              placeholder="Select address type"
              options={[
                { label: "Home", value: "home" },
                { label: "Office", value: "office" },
                { label: "Other", value: "other" },
              ]}
            />
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
              className="bg-(--primary-color-700)! hover:bg-(--primary-color-800)!  font-semibold!  sm:py-5! sm:text-base!"
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
